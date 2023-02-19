const loggedUser = localStorage.getItem("loggedUser");

document.getElementById("loggedUser").textContent = loggedUser;
let LogOutBtn = document.getElementById("logOut");
LogOutBtn.addEventListener("click", LogoutUser);
function LogoutUser() {
  localStorage.removeItem("loggedUser");
  window.location.href = "./index.html";
}

let givenAns = JSON.parse(localStorage.getItem("givenAns"));
let container = document.querySelector(".container");
function ShowReprtCard() {
 
  let correctAns = 0;
  let h3 = document.createElement("h3");
  h3.innerText = `User Name: ${loggedUser}`;

  container.append(h3);
  givenAns.map((ele) => {
    let h4 = document.createElement("h4");
    h4.innerHTML = `${ele.No}.${ele.Question}`;
    let hr = document.createElement("hr");
    container.append(h4);
    if (ele.status == "wrong") {
      let ans = document.createElement("h4");
      ans.innerHTML = `Selected ans: ${ele.SelectedOption}`;

      let correctAns = document.createElement("p");
      correctAns.innerHTML = `Correct Ans: ${ele.CorrectAns}`;
      let status = document.createElement("h4");
      status.style.color = "red";
      status.innerText = `Ans: ${ele.status}`;
      container.append(ans, status, correctAns);
    } else if (ele.status == "correct") {
      correctAns++;
      let ans = document.createElement("h4");
      ans.innerHTML = `Selected ans: ${ele.SelectedOption}`;

      let status = document.createElement("h4");
      status.style.color = "green";
      status.innerText = `Ans: ${ele.status}`;
      container.append(ans, status);
    } else {
      let status = document.createElement("h4");
      status.innerText = `Ans: ${ele.status}`;
      container.append(status);
    }
    container.append(hr);
  });
  let mark = document.createElement("h3");
  mark.innerText = `Total Points: ${correctAns}`;
  container.append(mark);
}
ShowReprtCard();
document.querySelector("#playAgain").addEventListener("click", function () {
  localStorage.removeItem("givenAns");
  window.location.href = "./quiz.html";
});
