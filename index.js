require('dotenv').config();
const path = require("path");
const bcrypt = require("bcryptjs");
const express = require("express");
const ejsMate = require("ejs-mate");
const cookieParser = require("cookie-parser");

// require the database connection
require("./Model/");


// initialize app
const app = express();


// to get json data and initialize req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// set ejs as template engine
app.engine('ejs',ejsMate);
app.set('view engine','ejs');

// to serve static files and look for views folder
app.set('views',path.join(__dirname,'view'));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
  if(res.locals.authUser === undefined)
    res.locals.authUser = null;
  next();
})

// get all the routes here
const userAuth_routes = require("./Routes/routes.userAuth");
app.use('/',userAuth_routes);


// get port number from env file
const PORT = process.env.PORT;

app.listen(PORT,()=>{
  console.log(`listening to the port ${PORT}`);
});
