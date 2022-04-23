/**
* monster is an app that lets you find and save your favourite Comments.
* We use the OpenFarm API to find crop data. See also:
* https://github.com/openfarmcc/OpenFarm/blob/master/docs/api_docs.md 
* We use MongoDB to maintain a list of Comments for each user.
*/ 

// get environment variables
require('dotenv').config() 

// SETUP MONGODB
const MONGODB_URI = process.env.MONGODB_URI 

// MongoDB Driver
const { MongoClient } = require('mongodb') 


// axios HTTP client https://www.npmjs.com/package/axios
const axios = require('axios');  

/* SETUP EXPRESS */
const express = require ('express')   // express framework 
const cors = require ('cors')         // Cross Origin Resource Sharing
const bodyParser = require('body-parser') // middleware to parse JSON data that is sent from the frontend.
const app = express(); // enable express
app.use( cors() ); // make express attach CORS headers to responses
app.use( express.json() ); // add json capabilities to our express app 

/* Serve up static assets, i.e. the Frontend of the site. */
app.use( '/', express.static('public')) 

  

// Connect to MongoDB
// See also https://www.mongodb.com/docs/drivers/node/current/fundamentals/connection/
MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true })
.then(client =>{ 
    const myCollection = client.db("commentbox").collection("commentboxs")

/** fetch a monster (list of comments) for a given name. */
app.get('/commentbox', (req,res) => {   
    myCollection.findOne(
        { monster: req.query.monster  }, 
        (error, commentbox)=>{
            /** If there is no result send a blank default monster. */
            if (error || commentbox == null) {
                return res.send({
                    monster:req.query.monster, 
                    comments: []
                })
            } 
            /** send the full data */
            res.send( commentbox )
        }
    ) 
})

/** Add/update a monster for a given name. 
 * See also: https://www.mongodb.com/docs/drivers/node/current/usage-examples/updateOne/
 * Read more about update operators: 
 * https://www.mongodb.com/docs/manual/reference/operator/update/#update-operators  */
app.post( '/commentbox', bodyParser.json(), (req,res) => { 
    myCollection.updateOne(
        {monster: req.body.monster}, 
        {$set: { comments : req.body.comments } },  
        {upsert: true},  /** upsert = create if it doesnt exist. */
        (error) => { 
            if (error)  return res.send('Error') 
            res.send('Data saved')
        }
    )
})
 

}) 



/** Tell Express to start listening. */
const PORT = process.env.PORT || 5000  
app.listen(PORT, () => {
  console.log("We are live on port "+PORT )
})