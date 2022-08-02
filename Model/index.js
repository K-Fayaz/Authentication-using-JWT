// code to set the mongoDB connection

const mongoose = require("mongoose");


// get the database url from the .env file
const DB_URL = process.env.DEV_DB_URL;



// connect to mongoose
mongoose.connect(DB_URL)
  .then((data)=>{
    console.log('connected to mongo Database');
  })
  .catch((err)=>{
    console.log(err.message);
  })
