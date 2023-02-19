let data = [
  {
    id: 1,
    question:
      "Who is often called &quot;the Maestro&quot; in the men&#039;s tennis circuit?",
    correct_answer: "Roger Federer",
    options: ["Roger Federer", "Bill Tilden", "Boris Becker", "Pete Sampras"],
  },
  {
    id: 2,
    question:
      "How many premier league trophies did Sir Alex Ferguson win during his time at Manchester United?",
    correct_answer: "13",
    options: ["11", "13", "20", "22"],
  },
  {
    id: 3,
    question:
      "How many times did Martina Navratilova win the Wimbledon Singles Championship?",
    correct_answer: "Nine",
    options: ["Ten", "Seven", "Nine", "Eight"],
  },
  {
    id: 4,
    question: "Which team was the 2015-2016 NBA Champions?",
    correct_answer: "Cleveland Cavaliers",
    options: [
      "Golden State Warriors",
      "Toronto Raptors",
      "Oklahoma City Thunders",
      "Cleveland Cavaliers",
    ],
  },
  {
    id: 5,
    question:
      "Which of these is not an additional variation of the color purple?",
    correct_answer: "Kobicha",
    options: ["Kobicha", "Byzantium", "Pomp and Power", "Palatinate"],
  },
  {
    id: 6,
    question: "Who painted the Sistine Chapel?",
    correct_answer: "Michelangelo",
    options: ["Leonardo da Vinci", "Pablo Picasso", "Michelangelo", "Raphael"],
  },
  {
    id: 7,
    question:
      "In bowling, what is the term used for getting three consecutive strikes?",
    correct_answer: "Turkey",
    options: ["Turkey", "Flamingo", "Birdie", "Eagle"],
  },
  {
    id: 8,
    question: "What was Mountain Dew&#039;s original slogan?",
    correct_answer: "Yahoo! Mountain Dew... It&#039;ll tickle your innards!",
    options: [
      "Give Me A Dew",
      "Do The Dew",
      "Get&#039; that barefoot feelin&#039; drinkin&#039; Mountain Dew",
      "Yahoo! Mountain Dew... It&#039;ll tickle your innards!",
    ],
  },
  {
    id: 9,
    question:
      "Linus Pauling, one of the only winners of multiple Nobel Prizes, earned his Nobel Prizes in Chemistry and what?",
    correct_answer: "Peace",
    options: ["Peace", "Physics", "Economics", "Physiology/Medicine"],
  },
  {
    id: 10,
    question: "Who painted the Mona Lisa?",
    correct_answer: "Leonardo da Vinci",
    options: [
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Claude Monet",
      "Vincent van Gogh",
    ],
  },
];
const loggedUser = localStorage.getItem("loggedUser");

document.getElementById("loggedUser").textContent = loggedUser;
let LogOutBtn = document.getElementById("logOut");
LogOutBtn.addEventListener("click", LogoutUser);
function LogoutUser() {
  localStorage.removeItem("loggedUser");
  window.location.href = "./index.html";
}

let container = document.querySelector(".container");
function OnLoadText() {
  container.innerHTML = "";
  let h2 = document.createElement("h2");
  h2.textContent = `Welcome! ${loggedUser}`;
  let p = document.createElement("p");
  p.textContent = "Are you ready to start quiz?";
  let btn = document.createElement("button");
  btn.textContent = "Start";
  btn.setAttribute("id", "startBtn");
  btn.addEventListener("click", function () {
    StartingQuiz(0);
  });
  container.append(h2, p, btn);
}
let givenAns = JSON.parse(localStorage.getItem("givenAns")) || [];
function StartingQuiz(count) {
  container.innerHTML = "";
  let h2 = document.createElement("h3");
  h2.innerHTML = `${data[count].id}. ${data[count].question}`;
  container.append(h2);
  let ans = document.createElement("p");
  ans.innerHTML = data[count].correct_answer;
  data[count].options.map((ele, index) => {
    let btn = document.createElement("button");
    btn.setAttribute("class", "options");
    btn.innerHTML = `${ele}`;

    btn.addEventListener("click", function () {
      if (btn.textContent == ans.textContent) {
        btn.style.backgroundColor = "green";
        btn.style.color = "white";
        setTimeout(() => {
          if (count == data.length - 1) {
            let payload = {
              No: data[count].id,
              Question: data[count].question,
              SelectedOption: btn.textContent,
              status: "correct",
            };
            givenAns.push(payload);
            localStorage.setItem("givenAns", JSON.stringify(givenAns));
          } else {
            StartingQuiz(count + 1);
            let payload = {
              No: data[count].id,
              Question: data[count].question,
              SelectedOption: btn.textContent,
              status: "correct",
            };
            givenAns.push(payload);
            localStorage.setItem("givenAns", JSON.stringify(givenAns));
          }
        }, 1000);
      } else {
        btn.style.backgroundColor = "red";
        btn.style.color = "white";
        setTimeout(() => {
          if (count == data.length - 1) {
            let payload = {
              No: data[count].id,
              Question: data[count].question,
              SelectedOption: btn.textContent,
              CorrectAns: data[count].correct_answer,
              status: "wrong",
            };
            givenAns.push(payload);
            localStorage.setItem("givenAns", JSON.stringify(givenAns));
          } else {
            let payload = {
              No: data[count].id,
              Question: data[count].question,
              SelectedOption: btn.textContent,
              CorrectAns: data[count].correct_answer,
              status: "wrong",
            };
            givenAns.push(payload);
            localStorage.setItem("givenAns", JSON.stringify(givenAns));
            StartingQuiz(count + 1);
          }
        }, 1000);
      }
    });
    container.append(btn);
  });
  let nextBtn = document.createElement("button");
  nextBtn.textContent = "Skip";
  nextBtn.setAttribute("id", "skip");
  if (data[count].id == 10) {
    nextBtn.textContent = "View Report card";
    nextBtn.style.left = "65%";
    nextBtn.addEventListener("click", function () {
      window.location.href = "./ReportCard.html";
    });
  } else {
    nextBtn.addEventListener("click", function () {
      if (data[count].id == 10) {
       
      } else {
        let payload = {
          No: data[count].id,
          Question: data[count].question,
          CorrectAns: data[count].correct_answer,
          status: "skip",
        };
        givenAns.push(payload);
        localStorage.setItem("givenAns", JSON.stringify(givenAns));
        StartingQuiz(count + 1);
      }
    });
  }

  container.append(nextBtn);
}


OnLoadText();
