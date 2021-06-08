/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://Team27:Team27@cluster0.arl4q.mongodb.net/Team27'

mongoose.connect(mongoURI, 
	{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
	).catch((error) => { 
		console.log('Error connecting to mongodb. Timeout reached.') 
	})
;

module.exports = { mongoose, mongoURI }  // Export the active connection.