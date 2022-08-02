const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { Schema , model } = require("mongoose");



// create User  Schema
const userSchema = new Schema({
  username:{
    type:String,
    required: [true,"You need to provide username!"],
    minLength:[3,"Username must consist atleast three charecters."]
  },
  email:{
    type:String,
    required:[true,"looks like you forgot to enter email"],
    unique:[true,"Someone already registered with this email!"],
  },
  password:{
    type:String,
    required:[true,"You alost forgot your password!"],
    minLength:[8,"password must contain atleast 8 charecters"],
  },
});


const User = model('User',userSchema);

module.exports = User;
