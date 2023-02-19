let form = document.querySelector("form");
form.addEventListener("submit", Login);

let signupDetails = JSON.parse(localStorage.getItem("SignUp"));
function Login(e) {
  e.preventDefault();
  let username = form.username.value;
  let password = form.password.value;
  let user = signupDetails?.filter((ele) => {
    return ele.username == username;
  });
  let pass = signupDetails?.filter((ele) => {
    return ele.password == password;
  });
  if (user?.length > 0 && pass?.length > 0) {
    alert("Login succesfull!");
    form.username.value = null;
    form.password.value = null;
    localStorage.setItem("loggedUser",username);
    window.location.href = "./quiz.html";
  } else {
    alert("Login failed,Please check details once!");
  }
}
