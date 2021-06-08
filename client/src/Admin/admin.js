import React, {Suspense, useEffect} from 'react';
import { styled, withTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import camera from '../images/camera.png'
import ground from '../images/ground.jpg'
import './admin.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import {NavExplore} from "../NavBar/NavBar"
import {newPosti, fetchPostsData} from '../actions/post.js';
import {fetchSessions, fetchUsersData} from '../actions/user.js';
import { useHistory } from "react-router"
import {Link} from 'react-router-dom';

var data = [
  { argument: 1, value: 3 },
  { argument: 3, value: 5 },
  { argument: 5, value: 3 },
  { argument: 7, value: 11 },
  { argument: 9, value: 9 },
  { argument: 11, value: 13 },
];

const GreenButton_explore = styled(Button)({
	backgroundColor: '#71A89E',
	borderRadius: '5px',
	marginLeft: '50px',
	marginTop: '15px',
	color: "white",
	Height: '48px',
	minWidth: '150px',
	textTransform: 'capitalize',
	"&:hover": {
		backgroundColor: "#009688",
		color: 'white'
	}
});

const drawerWidth = 170;


const useStyles1 = makeStyles((theme) => ({
  root: {
   flex: 1,
    backgroundImage: ground
    
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: 40
  },
  
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor:'#71A89E'
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'#71A89E'
  },
  list:{
    color: "white",
    marginTop: 10,
    display: 'block'
  },



  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    display: 'flex',
    width: 100,
    height: 100,
    marginTop: 20
  },
  typography: {
    color: "white",
    fontSize: 25,
  },

 
}));
export default function Admin(props) {
  var user_list = [];
  var new_list = [];
  var count = 0;
  const classes = useStyles1();
  const history = useHistory();
  useEffect(() =>{
      history.push('/Admin');
  }, [history]);



  const resource = fetchPostsData();
  let count_post = 0;
  let count_user = 0;
  let count_comment = 0;
  function GetPosts(){
    const got_posts = resource.posts.read();
      return(
          <div>
        
              {got_posts.length === 0 ?(
                  <h5 className="posts_empty">No Posts Yet</h5>
              ) :
              (
                              got_posts.map((item,index)=>{
                                count_comment += item.comments.length
                                count_post = count_post +1
                                  })
                      
                                )}
<div style={{ display: 'flex' }}>
            <Grid item xs={3} >
                  <Card id="car1" className="bg-dark text-white" >
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography component="h2" variant="h5">
                          Total Feedbacks
                        </Typography>
                        <Typography className={classes.typography} variant="subtitle1" color="textSecondary">
                        {count_comment}
                        </Typography>
                     
                      </CardContent>
                    </div>
                    <Hidden xsDown>
                      <CardMedia className={classes.cardMedia} image={camera}  />
                    </Hidden>
                  </Card>
               </Grid>
            
          <Grid item xs={3} >
            <Card id="car3" className="bg-dark text-white">
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    Total Posts
                  </Typography>
                  <Typography className={classes.typography} variant="subtitle1" color="textSecondary">
                  {count_post}
                  </Typography>
                </CardContent>
              </div>
              <Hidden xsDown>
                <CardMedia className={classes.cardMedia} image={camera}/>
              </Hidden>
            </Card>
          </Grid>
          
          </div>
          <Chart
            style={{ marginLeft: 100 , marginTop: 100}}
              data={data}
              width={900} height={500}
            >
              <ArgumentAxis />
              <ValueAxis />
              
              
              <LineSeries valueField="value" argumentField="argument" />
              
            </Chart>
          </div>
      );
    
}
const resour = fetchUsersData();
	function GetUsers(){ 
    
		const got_posts = resour.posts.read();
		return(
      <div id="lis">
	

				{got_posts.length === 0 ?(
					<h5 className="posts_empty">No Posts Yet</h5>
				) :
				(
				
					
								got_posts.map((item, index)=>{
									count_user = count_user +1
                  user_list.push(item.Username)  
								})
                
							)}
    <Grid item xs={3}>
        <Card id="car1" className="bg-dark text-white">
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                Total Users
              </Typography>
              <Typography className={classes.typography} variant="subtitle1" color="textSecondary">
              {count_user}
              </Typography>
    
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={camera}  />
          </Hidden>
        </Card>
    </Grid>
   
    
 
         
        <div id='gg'>
          <h1>List of Users</h1>
          <div className = "feedback-box">
          {user_list.map((item, selectedIndex) =>{
          return(
            <List aria-label="main mailbox folders">
              <ListItem
                button
                selected={selectedIndex === 0}
              >
                <Link >{item}</Link>

              </ListItem>
              </List>
          )
          }
          )}
                
        </div>
        </div>
			</div>
		);
		
	}


  
    return(
    <div>
        <div  className={classes.root}  >
         
          <NavExplore className="nav" app = {props.app} log = {props.history}/>

          <main className={classes.content}> 

            <h1 id='head'>Overview</h1>

            <div style={{ display: 'flex' }}>
            
            <Suspense fallback={<h2>Loading Posts...</h2>}>
                  <GetPosts/>
            </Suspense>
            

            <Suspense fallback={<h2>Loading Users...</h2>}>
                  <GetUsers/>
            </Suspense>
           
            </div>
            
            
            

            </main>
   
    </div>
    
    </div>
      )
  } 







