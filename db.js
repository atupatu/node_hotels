const mongoose = require("mongoose");
require('dotenv').config();

// Define the monogoDB connection
//const mongoURL = 'mongodb://localhost:27017/hotels'
//const mongoURL = 'mongodb+srv://atupatu:atupatu@cluster0.5skup6x.mongodb.net/'
//const mongoURL = process.env.DB_URL;
 const mongoURL = process.env.DB_URL_LOCAL;

//set up mongo db connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get the default connection
//Mongoose maintains defualt connection onject represeting the MongoDb connection
const db = mongoose.connection;

db.on('connected' ,() =>
{
    console.log("Connected to mongoDB serever");
})

db.on('error' , (err)=>{
    console.error("MongoDB connection error:",err);
});

db.on('disconnected',()=>
{
    console.log("MongoDB disconnected");
});

//export the database connection
module.exports = db;