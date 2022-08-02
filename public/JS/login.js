let form        = document.getElementById("form");
let email       = document.getElementById("email");
let password    = document.getElementById("password");
let emailErr    = document.getElementById("email-error");
let passwordErr = document.getElementById("password-error");

window.addEventListener('load',()=>{

  form.addEventListener('submit',handleSubmit);
})


function handleSubmit(event)
{
  event.preventDefault();

  let data = {
    email: email.value,
    password: password.value,
  }

  console.log(data);

  $.ajax({
    method:"POST",
    url:'/login',
    data
  })
  .then((data)=>{
    location.assign('/');
  })
  .catch((err)=>{
    let error = JSON.parse(err.responseText);
    emailErr.innerText = error.email;
    passwordErr.innerText = error.password;
  })

}
