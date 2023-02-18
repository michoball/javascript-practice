const form = document.getElementById("user-input");

function signupHandler(e) {
  e.preventDefault();
  const userNameInput = document.getElementById("username");
  const enteredusername = userNameInput.value;

  const passwordInput = document.getElementById("password");
  const enteredPassword = passwordInput.value;

  if (enteredusername.trim().length === 0) {
    alert("Invalid input - username must not be empty");
    return;
  }
  if (enteredPassword.trim().length <= 5) {
    alert("Invalid input - password must be six characters of longer");
    return;
  }

  const user = {
    userName: enteredusername,
    password: enteredPassword,
  };

  console.log(user);
  console.log("Hi, I am " + user.userName);
}

form.addEventListener("submit", signupHandler);
