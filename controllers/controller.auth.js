const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/user.model");
const SECRET = process.env.SIGNATURE_SECRET;
const { getError , getLoginError }  = require("../middlewares/helpers");
const Seed = require("../seed/seed");


const getLogout = function(req,res){
  // get the auth cookie and minimize its expire time to 1ms
  let { auth } = req.cookies;

  res.cookie('auth','',{
    httpOnly:true,
    maxAge:1
  });

  res.redirect('/');

}

// render recipee page
const getRecipe = function(req,res){
  console.log(Seed);
  res.render("recipe",{ Seed });
}

// render home page
const getHome = function(req,res){
  res.render('home');
}

const login_get = function(req,res){
  // render the login file
  res.render("login");
}

const login_post = async function(req,res){

  let { email , password } = req.body;

  try{
    // find the User
    let user = await User.findOne({email});
    if(!user){
      throw Error("User was not found!");
    }

    // compare the password
    let truthy = await bcrypt.compare(password,user.password);
    if(truthy){

      // ********* Create a token *********
      // initialize payoad
      let payload = {
        email,
        user_id: user._id,
      }

      let token = jwt.sign(payload,SECRET,{
        expiresIn:'1d'
      });

      res.cookie('auth',token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json(user);

    }else {
      // passwords did not match
      throw Error("passwords did not match!");
    }
  }
  catch(err)
  {
    let error = getLoginError(err.message);
    console.log(error);
    res.status(400).send(error);
  }
}

const signup_get = function(req,res){
  res.render("signUp");
}

const signup_post = async function(req,res){

  const { email , password , username } = req.body;

  console.log(req.body);
  try{

    // check if User already exists
    let user = await User.findOne({ email });
    if(user){
      throw Error("User already exists!");
    }
    // Create a new user
    let newUser = await User.create({username , email , password });

    // hash the password
    let hashedPassword = await bcrypt.hash(password,10);
    newUser.password = hashedPassword;
    await newUser.save();
    console.log(newUser);
    // Create jwt tokens

    let payload = {
      email,
      user_id: newUser._id
    };


    let token = jwt.sign(payload,SECRET,{
      expiresIn:'1d'
    });

    res.cookie('auth',token,{
      maxAge:24 * 60 * 60 * 1000,
      httpOnly:true,
    });

    res.status(201).send(newUser);

  }
  catch(err){
    // console.log(err.message);
    let error = getError(err.message)
    console.log(error);
    res.status(400).json(error);
  }
}

module.exports = {
  getHome,
  login_get,
  login_post,
  signup_get,
  signup_post,
  getRecipe,
  getLogout,
};
