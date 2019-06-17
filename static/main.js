

// checks if the registration form is filled out correctly
document.querySelector("#register-button").addEventListener("click", function(e){
  let username = document.querySelector("#reg-username").value;
  let password = document.querySelector("#reg-password").value;
  let confirmation = document.querySelector("#reg-confirmation").value;

  if (!username){
    document.querySelector("#reg-username").setAttribute("style", "border: 2px solid red");
    document.querySelector("#reg-username-warning").innerHTML = "Please type a valid username";
    e.preventDefault();
    console.log("no username");
  } else if (!password){
    e.preventDefault();
    document.querySelector("#reg-password").setAttribute("style", "border: 2px solid red");
    document.querySelector("#reg-password-warning").innerHTML = "Please type in your password";
    console.log("no password");
  } else if (!confirmation){
    e.preventDefault();
    console.log("no confirmation");
  } else if(password != confirmation) {
    e.preventDefault();
    console.log("password and confirmation are wrong");
  } else {
    return;
  }

  
  
})