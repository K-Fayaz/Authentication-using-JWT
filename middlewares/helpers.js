const jwt = require("jsonwebtoken");
const SECRET = process.env.SIGNATURE_SECRET;
const User = require("../Model/user.model");

const getError = (err)=>{
  let error = { email:'', custom:'', password:'', username:''};
  if(err.includes("User validation failed"))
  {
    if(err.includes("username")){
      error["username"] = "Username must consist atleast 3 charecters!"
    }

    if(err.includes("password")){
      error["password"] = "Password must contain atleast 8 charecters!";
    }

    if(err.includes("email"))
    {
      error["email"] = "looks like you forgot to enter email";
    }
  }else{
    error["custom"] = err;
  }

  return error;
}

const isAuthenticated = async (req,res,next)=>{

  // get the auth from cookies
  let { auth } = req.cookies;

  // if auth was not found than redirect him to login page
  if(!auth){
    res.redirect('/login');
  }

  // try if the auth is genuine and is not tampered with else redirect the user to login page
  try{

    let decode = await jwt.verify(auth,SECRET);
    console.log(decode);
    let email = decode.email;
    res.locals.authUser = email;
    // the user is now authenticated !!!
    next();
  }
  catch(err){
    console.log(err.message);   // jwt malformed
    res.redirect("/login");
  }

}

const getLoginError = function(err)
{
  let error = { email:'', custom:'', password:''};

  if(err === "passwords did not match!"){
    error["password"] = "passwords did not match!";
  }

  if(err === "User was not found!"){
    error.email = "User was not found with this email!";
  }else{
    error["custom"] = err;
  }
  return error;
}


module.exports = {
  getError,
  getLoginError,
  isAuthenticated,
}
