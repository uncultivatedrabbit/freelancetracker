// tests the registration page to ensure user inputs information correctly
 let username = document.querySelector("#reg-username");
 let password = document.querySelector("#reg-password");
 let confirmation = document.querySelector("#reg-confirmation");
 let usernameWarning = document.querySelector("#username-span");
 let passwordWarning = document.querySelector("#password-span");
 let confirmationWarning = document.querySelector("#confirmation-span");
 let matchWarning = document.querySelector("#match-span");
 

// checks if the registration form is filled out correctly
if (document.querySelector("#register-button")){
  document.querySelector("#register-button").addEventListener("click", function(e){
  
    if (!username.value){
      username.classList.add("form-warning");
      usernameWarning.innerHTML = "Please type a valid username.";
      e.preventDefault();
    } else if (!password.value){
      password.classList.add("form-warning");
      passwordWarning.innerHTML = "Please type in your password.";
      e.preventDefault();
    } else if (!confirmation.value){
      confirmation.classList.add("form-warning");
      confirmationWarning.innerHTML = "Please confirm your password."
      e.preventDefault();
    } else if (password.value != confirmation.value) {
      confirmation.classList.add("form-warning-2");
      matchWarning.innerHTML = "Sorry your passwords did not match.";
      e.preventDefault();
    } else {
      return;
    }
  })
}
  

// tests the login page to ensure the user inputs correct fields
let loginName = document.querySelector("#login-username");
let loginPassword = document.querySelector("#login-password");

if (document.querySelector("#login-btn")){
  document.querySelector("#login-btn").addEventListener("click", function(e){
    if (!loginName.value){
      loginName.classList.add("form-warning");
      usernameWarning.innerHTML = "Please type a valid username.";
      e.preventDefault();
    } else if (!loginPassword.value){
      loginPassword.classList.add("form-warning");
      passwordWarning.innerHTML = "Please enter your password";
      e.preventDefault();
    }
  })
}

