let form = document.querySelector("form");
form.addEventListener("submit", SignUp);

let signupDetails = JSON.parse(localStorage.getItem("SignUp")) || [];
function SignUp(e) {
  e.preventDefault();
  let username = form.username.value;
  let email = form.email.value;
  let password = form.password.value;
  let user = signupDetails.filter((ele) => {
    return ele.email == email;
  });

  let userName = signupDetails.filter((ele) => {
    return ele.username == username;
  });
  if (user.length > 0) {
    alert("User Already exist!");
  } else if (userName.length > 0) {
    alert("User name Alreadt taken. please choose different!");
  } else {
    let payload = {
      username: username,
      email: email,
      password: password,
    };
    signupDetails.push(payload);
    localStorage.setItem("SignUp", JSON.stringify(signupDetails));
    alert("SignUp succesfull!");
    form.username.value = null;
    form.email.value = null;
    form.password.value = null;
    window.location.href = "./index.html";
  }
}
