// This file is responsible for db connection


const mongoose = require('mongoose');

// Define the MongoDB connection url

const mongoURL = 'mongodb://localhost:27017/hotels' 

// Set up mongoDB connection

mongoose.connect(mongoURL,{
    
})

// Get the default connnection
//  mongoose maintains a default connection object
 //representing the mongoDB connection

const db =mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to mongoDb server");
    
})

db.on('error',(err)=>{
    console.error("MongoDB connection error:",err);

    
});
db.on('disconnected',()=>{
    console.log("MongoDB disconnected");
    
})

// Export the database

module.exports=db;