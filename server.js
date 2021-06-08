/* server.js, with mongodb API */
'use strict';
const log = console.log
const path = require('path')

const env = process.env.NODE_ENV
const toggle = true; // true for storing the sessions, false otherwise

const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON 
const TEST_USER_ID = '6068f6e62b019d37f898628c'
const TEST_USER_USERNAME = 'test'


const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose, mongoURI } = require('./db/mongoose')
mongoose.set('bufferCommands', false); 

const cors = require('cors')
if (env !== 'production') { app.use(cors()) }


// import the mongoose models
const { User } = require('./models/user')
const { Post } = require('./models/post')

// to validate object IDs
const { ObjectID, MongoClient } = require('mongodb')

// File upload/retreival from db using multer and GridFS
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const crypto = require('crypto');

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

/*** Helper functions below **********************************/
function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

let gfs;
const gfsCollectionName = 'uploads'

// GridFS stream
// Reference: https://github.com/aheckmann/gridfs-stream
const db = mongoose.connection;
db.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection(gfsCollectionName);

});

// GridFS storage engine
// Reference: https://github.com/devconcept/multer-gridfs-storage
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return {
      filename: file.originalname,
	  bucketName: gfsCollectionName
    }
  }
});
const gfsUpload = multer({ storage });

let count;
const session = require("express-session");
const MongoStore = require('connect-mongo');


// for session
app.use(
    session({
        secret: process.env.SESSION_SECRET || "our hardcoded secret", // make a SESSION_SECRET environment variable when deploying (for example, on heroku)
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 600000,
            httpOnly: true
        },
        // store the sessions on the database in production
		store: toggle ? MongoStore.create({mongoUrl: 'mongodb+srv://Team27:Team27@cluster0.arl4q.mongodb.net/Team27'}) : null
    })
);

const authenticate = (req, res, next) => {
	if (env !== 'production' && USE_TEST_USER)
        req.session.user = TEST_USER_ID


    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("user not authorized");
        })
    } else {
        res.status(401).send("user not authorized");
    }
}


app.use(express.static(path.join(__dirname, '/public')))

app.get("/checkSession", (req, res) => {
	if (env !== 'production' && USE_TEST_USER) {
        req.session.user = TEST_USER_ID;
        req.session.Username = TEST_USER_USERNAME;
        res.send({ currentUser: TEST_USER_USERNAME })
        return;
    }

    if (req.session.user) {
        res.send({ currentUser: req.session.Username });
    } else {
        res.status(401).send();
    }
});



app.post('/loginUser', (req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal mongoose server error');
		return;
	}
	
	const username = req.body.Username;
	const password = req.body.Password;
	
	User.findByUsernamePassword(username, password)
        .then(userToLogin => {
			if(userToLogin !== null){
				req.session.user = userToLogin._id;
				req.session.Username = userToLogin.Username;
				res.send({currentUser: userToLogin.Username, success: true});
			}else{
				res.send({currentUser: undefined, success: false});
			}
        })
        .catch(error => {			
            res.status(400).send()
		});
		
		
})

app.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

app.post('/addUser', (req, res) => {

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  


	User.findOne({Username: req.body.Username}).then((foundUser) => {
		if(!foundUser){
			const newUser = new User({
				dateOfBirth: "",
				Program: "",
				Username: req.body.Username,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				password: req.body.Password
			})

			newUser.save().then((result) => {
				req.session.user = result._id;
				req.session.Username = result.Username;
				res.send({Username:req.body.Username, userFound: false});
			}).catch((error) => {
				if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
					res.status(500).send('Internal server error')
				} else {
					res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
				}
			})
		}else{
			res.send({Username:null, userFound: true});
		}
	}).catch((error) => {
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	})
})

app.post('/addPost', gfsUpload.single('file'),authenticate, (req, res) => {
	// log(req.body)

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	// Create a new student using the Student mongoose model
	const newPost = new Post({
		Username: req.body.Username,
		title: req.body.title,
		subtitle: req.body.subtitle,
		date: req.body.date,
		file: req.file.id,
		fileUrl: req.body.fileUrl,
		desc: req.body.desc,
		likes: req.body.likes,
		comments: []
	})


	newPost.save().then((result) => {
		res.send(result)
	}).catch((error) => {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	})

})
// app.post('/addPost/:id',authenticate, (req, res) => {
app.post('/addPost/:id',(req, res) => {
	// log(req.body)

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  


	let comment = {
		_id: ObjectID(),
		Username: req.body.Username, 
		text: req.body.text,
		time: req.body.time,
		type: req.body.type,
		feedback: req.body.feedback
	}

	Post.findOne({_id:req.params.id}).then((p)=>{  
		p.comments.push(comment)  
		p.save().then((rest)=> {  
			res.send({  
					comment: rest.comments[rest.comments.length-1],  
					post: rest  
				})  
		}).catch((error) =>{  
			res.status(500).send(error)  
		})  
	
	}).catch((error)=>{  
		res.status(500).send(error)  
	})  
		 
	if (req.body.type == "HIGHLIGHT") {
		Post.findOne({_id:req.params.id}).then((p)=>{  
			p.highlights.push(comment)  
			p.save().then((rest)=> {  
				res.send({  
						highlight: rest.highlights[rest.highlights.length-1],  
						post: rest  
					})  
			}).catch((error) =>{  
				res.status(500).send(error)  
			})  
		
		}).catch((error)=>{  
			res.status(500).send(error)  
		})  
	}
	

})


app.get('/getPost', (req, res) => {
	
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal mongoose server error');
		return;
	}
	Post.find().then((temp) => {
		res.send(temp)
	})
	.catch((error) => {
		log(error)
		res.status(500).send("Internal Server Error")
	})
})
app.get('/getPostByLikes', (req, res) => {
	
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal mongoose server error');
		return;
	}
	// .sort({likes: -1})
	Post.find().sort({likes: 1}).then((temp) => {
		res.send(temp)
	})
	.catch((error) => {
		log(error)
		res.status(500).send("Internal Server Error")
	})
})

// app.get('/getPost/:id', authenticate, (req, res) => {
app.get('/getPost/:id', (req, res) => {
	
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal mongoose server error');
		return;
	}
	
	Post.findOne({_id: req.params.id}).then((temp) => {
		// res.send(students) // just the array
		res.send({comments: temp.comments})
	})
	.catch((error) => {
		log(error)
		res.status(500).send("Internal Server Error")
	})
	
})

app.get('/highlights/:pid/:hid', (req, res) => {
	
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal mongoose server error');
		return;
	}
	Post.findById(req.params.pid).then((post) => {
		if (!post) {
			res.status(404).send('Post not found')
		} else {
			let highlights = post.highlights.id(req.params.hid);
			res.send(highlights)

		}
	})
	.catch((error) => {
		log(error)
		res.status(500).send('Internal Server Error') 
	});
})

app.put('/updateInfo', (req, res) => {
	
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal mongoose server error');
		return;
	}

	let dateOfBirth= req.body.dateOfBirth
	let Program= req.body.Program
	let firstName = req.body.firstName
	let lastName = req.body.lastName

	User.findOne({Username: req.body.Username}).then((temp) => {
		if (!temp) {  
			res.status(404).send('Resource not found')  
		} else {  
		if(dateOfBirth != null && dateOfBirth != ''){
			temp.dateOfBirth = dateOfBirth;
		}
		if(Program != null && Program != ''){
			temp.Program = Program;
		}
		if(firstName != null && firstName != ''){
			temp.firstName = firstName;
		}
		if(lastName != null && lastName != ''){
			temp.lastName = lastName;
		}
		
	
		temp.save().then((r) => {
			res.send(r)
		}).catch((error) => {
			log(error)
			res.status(500).send("Internal Server Error")
		})
		}
	}).catch((error) => {
		log(error)
		res.status(500).send("Internal Server Error")
	})
	
	
})

app.get('/getUser', (req, res) => {
	
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal mongoose server error');
		return;
	}
	User.find().then((temp) => {

		// res.send(students) // just the array
		res.send(temp)
	})
	.catch((error) => {
		log(error)
		res.status(500).send("Internal Server Error")
	})
	
})

app.get('/files/:id', (req, res) => {
	gfs.files.findOne({ _id: ObjectID(req.params.id) }, (err, file) => {
		// Check if file
		if (!file || file.length === 0) {
			return res.status(404).json({
			err: 'No file exists'
			});
		}
		const readstream = gfs.createReadStream(file.filename);
		readstream.pipe(res);

  });
})

app.use(express.static(path.join(__dirname, "/client/build")));


app.patch('/updatePost/:id/:like', authenticate, (req, res) => {  
// app.patch('/updatePost/:id/:like', (req, res) => {  
	const postId = req.params.id;
    // check mongoose connection established.  
    if (mongoose.connection.readyState != 1) {  
        log('Issue with mongoose connection')  
        res.status(500).send('Internal server error')  
        return;  
    }   
    Post.findOne({_id:postId}).then((rest)=>{ 
        rest.likes = (parseInt(rest.likes) + parseInt(req.params.like)).toString();
        rest.save().then((rest_patch)=>{  
            res.send({  
            })
        })  
    }).catch((error)=>{  
        res.status(500).send(error)  
    })  
  
})  
 
app.delete('/deletePost/:postid', (req, res) => {  
 
    // check mongoose connection established.  
    if (mongoose.connection.readyState != 1) {  
        log('Issue with mongoose connection')  
        res.status(500).send('Internal server error')  
        return;  
    }   
  
    Post.deleteOne({_id:req.params.postid}).then((post)=>
		post.save()
	).catch((error)=>{  
        res.status(500).send(error)  
    })  
  
})
app.get("*", (req, res) => {
    const goodPageRoutes = ["/", "/Login",  "/PostPage", "/ResumeView", "/Admin", "/Profile", "/highlight-feedback", "/Explore", "/SignUP"];
    if (!goodPageRoutes.includes(req.url)) {
        res.status(404);
    }

    // send index.html
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log("Listening on port 5000....");
}) 

