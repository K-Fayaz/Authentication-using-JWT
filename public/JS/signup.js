// all variables here
let form        = document.getElementById("form");
let email       = document.getElementById("email");
let password    = document.getElementById("password");
var username    = document.getElementById("username");
let button      = document.getElementById("sign-up-button");

var emailErr    = document.getElementById("email-error");
var usernameErr = document.getElementById("username-error");
var passwordErr = document.getElementById("password-error");

window.addEventListener("load",()=>{

  // handles form submit
  form.addEventListener('submit',submitForm);

})

async function submitForm(event)
{
  event.preventDefault();

  let data = {
    email:email.value,
    username:username.value,
    password:password.value,
  };

  // make ajax request
  $.ajax({
    method:"POST",
    url:'/create/account',
    data,
  })
  .then((data)=>{
    window.location.assign("/");
  })
  .catch((err)=>{
    let message = JSON.parse(err.responseText);
    passwordErr.innerText = message.password;
    usernameErr.innerText = message.username;
    emailErr.innerText = message.email || message.custom;
  })

}
