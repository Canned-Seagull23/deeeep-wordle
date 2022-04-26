//Variables
const words = ["depth",
               "ocean",
               "water",
               "coral",
               "algae",
               "boost",
               "shark",
               "whale",
               "squid",
               "hippo",
               "giant",
               "manta",
               "polar",
               "jelly",
               "snake",
               "bleed",
               "coins",
               "score",
               "skins"
               ];
let currentLine = 1;
let won = false;
const cache = {
  setCookie: function (name, value, expiryDays, path) {
      const d = new Date();
      d.setTime(d.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
      let expiry = d.toUTCString();
      document.cookie = `${name}=${value}; expires=${expiry}; path=${path}`
  },
  getCookie: function (cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  },
  deleteCookie: function (name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }
};
//Utility Functions
const random = {
  integer: function(max, min) {
    return Math.floor(Math.random() * max) + min;
  },
  object: function(array) {
    return array[random.integer(array.length, 0)];
  }
};
//Start a new Wordle
let currentWord = random.object(words);
let currentWordArray = currentWord.split("");
//Regenerate Wordle
const generateNewWord = () => {
  currentWord = random.object(words);
  currentWordArray = currentWord.split("");
  currentInput = [];
  currentLine = 1;
  won = false;
  for(let line = 1; line < 7; line++) {
    let box1 = document.getElementById(line + "_1");
    let box2 = document.getElementById(line + "_2");
    let box3 = document.getElementById(line + "_3");
    let box4 = document.getElementById(line + "_4");
    let box5 = document.getElementById(line + "_5");
    box1.innerHTML = "";
    box2.innerHTML = "";
    box3.innerHTML = "";
    box4.innerHTML = "";
    box5.innerHTML = "";
    //remove incorrect class
    box1.classList.remove("boxIncorrect");
    box2.classList.remove("boxIncorrect");
    box3.classList.remove("boxIncorrect");
    box4.classList.remove("boxIncorrect");
    box5.classList.remove("boxIncorrect");
    //Remove Correct class
    box1.classList.remove("boxCorrect");
    box2.classList.remove("boxCorrect");
    box3.classList.remove("boxCorrect");
    box4.classList.remove("boxCorrect");
    box5.classList.remove("boxCorrect");
    //remove yellow class
    box1.classList.remove("boxYellow");
    box2.classList.remove("boxYellow");
    box3.classList.remove("boxYellow");
    box4.classList.remove("boxYellow");
    box5.classList.remove("boxYellow");
  };
};
//Current input
let currentInput = [];
//Detect Input
let keypressed = {};
const processInput = (keyPressed) => {
  let key = keyPressed.key.toLowerCase();
  if(keyPressed.code == "Backspace") {
    currentInput.pop();
    addInput();
  } else if(keyPressed.code == "Enter") {
    enterInput();
    revealAnswers();
  } else if(currentInput.length < 5) {
    checkValidChar(keyPressed);
    addInput();
  };
};
//Process Input
function addInput() {
  if(won == false) {
    updateUI(currentLine);
  };
};
function checkValidChar(keyPressed) {
  let key = keyPressed.code;
  if(key == "KeyA" || key == "KeyB" || key == "KeyC" || key == "KeyD" || key == "KeyE" || key == "KeyF" || key == "KeyG" || key == "KeyH" || key == "KeyI" || key == "KeyJ" || key == "KeyK" || key == "KeyL" || key == "KeyM" || key == "KeyN" || key == "KeyO" || key == "KeyP" || key == "KeyQ" || key == "KeyR" || key == "KeyS" || key == "KeyT" || key == "KeyU" || key == "KeyV" || key == "KeyW" || key == "KeyX" || key == "KeyY" || key == "KeyZ") {
     currentInput.push(keyPressed.key.toLowerCase());
  };
};
function enterInput() {
  if(won == true) {return;};
  if(currentInput.length == 5 && currentLine != 7) {
    checkAnswers(currentLine);
    currentLine += 1;
    currentInput = [];
  } else {
    alert("Your word is not long enough!");
  };
};
function revealAnswers() {
  if(currentLine == 7 && won === false) {
    alert("The correct answer was \"" + currentWord + "\"");
  };
};
document.addEventListener("keydown", processInput, false);
//Update UI
function updateUI(currentLine) {
  for(let clearBox = 1; clearBox < 6; clearBox++) {
    let currentClearBox = document.getElementById(currentLine + "_" + clearBox);
    currentClearBox.innerHTML = "";
  };
  for(let box = 1; box < currentInput.length + 1; box++) {
    let currentBox = document.getElementById(currentLine + "_" + box);
    currentBox.innerHTML = currentInput[box - 1].toUpperCase();
  };
};
//Check Answers
function checkAnswers(currentLine) {
  for(let box = 1; box < 6; box++) {
    let currentBox = document.getElementById(currentLine + "_" + box);
    currentBox.setAttribute("class", "boxIncorrect");
    if(currentInput[box - 1] == currentWordArray[box - 1]) {
      currentBox.setAttribute("class", "boxCorrect");
    } else {
      for(let arrayIndex = 0; arrayIndex < 5; arrayIndex++) {
        if(currentInput[box - 1] == currentWordArray[arrayIndex]) {
          currentBox.setAttribute("class", "boxYellow");
        };
      };
    };
    if(box == 5) {
      let box1 = document.getElementById(currentLine + "_1").innerHTML.toLowerCase();
      let box2 = document.getElementById(currentLine + "_2").innerHTML.toLowerCase();
      let box3 = document.getElementById(currentLine + "_3").innerHTML.toLowerCase();
      let box4 = document.getElementById(currentLine + "_4").innerHTML.toLowerCase();
      let box5 = document.getElementById(currentLine + "_5").innerHTML.toLowerCase();
      if(box1 === currentWordArray[0] && box2 === currentWordArray[1] && box3 === currentWordArray[2] && box4 === currentWordArray[3] && box5 === currentWordArray[4]) {
        alert("Correct!");
        won = true;
      };
    };
  };
};