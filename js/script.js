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
var currentLine = 1;
var won = false;
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
var currentWord = random.object(words);
var currentWordArray = currentWord.split("");
//Regenerate Wordle
const generateNewWord = function() {
  currentWord = random.object(words);
  currentWordArray = currentWord.split("");
  currentInput = [];
  currentLine = 1;
  won = false;
  for(let line = 1; line < 7; line++) {
    var box1 = document.getElementById(line + "_1");
    var box2 = document.getElementById(line + "_2");
    var box3 = document.getElementById(line + "_3");
    var box4 = document.getElementById(line + "_4");
    var box5 = document.getElementById(line + "_5");
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
var currentInput = [];
//Detect Input
const processInput = (keyPressed) => {
  var key = keyPressed.key.toLowerCase();
  if(keyPressed.code == "Backspace") {
    currentInput.pop();
    input.addInput();
  } else if(keyPressed.code == "Enter") {
    checkInput.checkValidWord(currentInput);
    input.enterInput();
    revealAnswers();
  } else if(currentInput.length < 5) {
    checkInput.checkValidChar(keyPressed);
    input.addInput();
  };
};
//Process Input
const input = {
  addInput: function() {
    if(won == false) {
      updateUI(currentLine);
    };
  },
  enterInput: function() {
    if(won == true) {return;};
    if(currentInput.length == 5 && currentLine != 7) {
      checkAnswers(currentLine);
      currentLine += 1;
      currentInput = [];
    } else {
        alert("Your word is not long enough!");
    };
  },
};
//Check Words
const checkInput = {
  checkValidChar: function(keyPressed) {
    let key = keyPressed.code;
    if(key == "KeyA" || key == "KeyB" || key == "KeyC" || key == "KeyD" || key == "KeyE" || key == "KeyF" || key == "KeyG" || key == "KeyH" || key == "KeyI" || key == "KeyJ" || key == "KeyK" || key == "KeyL" || key == "KeyM" || key == "KeyN" || key == "KeyO" || key == "KeyP" || key == "KeyQ" || key == "KeyR" || key == "KeyS" || key == "KeyT" || key == "KeyU" || key == "KeyV" || key == "KeyW" || key == "KeyX" || key == "KeyY" || key == "KeyZ") {
       currentInput.push(keyPressed.key.toLowerCase());
    };
  },
  checkValidWord: function(currentInput) {
    for(let arrayIndex = 0; arrayIndex < words.length; x++) {
      if(currentInput == words[arrayIndex].split("")) {
        return;
        console.log("x");
      };
      console.log(arrayIndex);
    };
    return;
  }
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
    var currentClearBox = document.getElementById(currentLine + "_" + clearBox);
    currentClearBox.innerHTML = "";
  };
  for(let box = 1; box < currentInput.length + 1; box++) {
    var currentBox = document.getElementById(currentLine + "_" + box);
    currentBox.innerHTML = currentInput[box - 1].toUpperCase();
  };
};
//Check Answers
function checkAnswers(currentLine) {
  for(let box = 1; box < 6; box++) {
    var currentBox = document.getElementById(currentLine + "_" + box);
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
      var box1 = document.getElementById(currentLine + "_1").innerHTML.toLowerCase();
      var box2 = document.getElementById(currentLine + "_2").innerHTML.toLowerCase();
      var box3 = document.getElementById(currentLine + "_3").innerHTML.toLowerCase();
      var box4 = document.getElementById(currentLine + "_4").innerHTML.toLowerCase();
      var box5 = document.getElementById(currentLine + "_5").innerHTML.toLowerCase();
      if(box1 === currentWordArray[0] && box2 === currentWordArray[1] && box3 === currentWordArray[2] && box4 === currentWordArray[3] && box5 === currentWordArray[4]) {
        alert("Correct!");
        won = true;
      };
    };
  };
};
