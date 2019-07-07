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
  document.querySelector("#register-button").addEventListener("click", e => {
  
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
  document.querySelector("#login-btn").addEventListener("click", e => {
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

if (document.querySelector("#add-button")){
  let btn = document.querySelector("#add-button")
  btn.disabled = true;
  document.querySelector("#todo-list").addEventListener("input", () => {
    if (document.querySelector("#todo-list").value == ""){
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  })
}

if (document.querySelector("#startStop")){

  let displaySeconds = 0;
  let displayMinutes = 0;
  let displayHours = 0;
  let startBtn = document.querySelector("#startStop");
  let resetBtn = document.querySelector("#reset");
  let digitalClock = document.querySelector("#digital-clock");
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let status = false;

  //build timer function
  function startTimer(){
    seconds++

    if (seconds / 60 == 1){
      seconds = 0;
      minutes++;
      if (minutes / 60 == 1){
        minutes = 0;
        hours++;
      }
    }

    if (seconds < 10){
      displaySeconds = "0" + seconds.toString();
    } else {
      displaySeconds = seconds;
    }
  
    if (minutes < 10){
      displayMinutes = "0" + minutes.toString();
    } else {
      displayMinutes = minutes;
    }
  
    if (hours < 10){
      displayHours = "0" + hours.toString();
    } else {
      displayHours = hours;
    }

    digitalClock.innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;
  }

  startBtn.addEventListener("click", () => {
    if (status == false) {
      status = true;
      start = setInterval(startTimer, 1000);
      startBtn.innerHTML = '<i class="fas fa-pause"></i>'
      startBtn.classList.remove("btn-success");
      startBtn.classList.add("btn-warning");
    } else {
      status = false;
      clearInterval(start);
      startBtn.innerHTML = '<i class="fas fa-play"></i>'
      startBtn.classList.add("btn-success");
      startBtn.classList.remove("btn-warning");
    }
  })

  resetBtn.addEventListener("click", () => {
    clearInterval(start);
    seconds = 0;
    minutes = 0;
    hours = 0;
    digitalClock.innerHTML = "00:00:00";
    startBtn.innerHTML = '<i class="fas fa-play"></i>';
    startBtn.classList.add("btn-success");
    startBtn.classList.remove("btn-warning");
  })


}