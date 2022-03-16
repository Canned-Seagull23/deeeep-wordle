//Variables
const words = ["depth",
               "boost",
               "shark",
               "ocean",
               "charge",
               "whale",
               "squid"
               ];
var currentLine = 1;
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
const generateNewWord = () => {
  currentWord = random.object(words);
  currentWordArray = currentWord.split("");
};
//Current input
var currentInput = [];
//Detect Input
var keypressed = {};
const processInput = (keyPressed) => {
  var key = keyPressed.key.toLowerCase();
  if(keyPressed.code == "Backspace") {
    currentInput.pop();
    addInput();
  } else if(keyPressed.code == "Enter") {
    enterInput();
  } else if(currentInput.length < 5) {
    currentInput.push(key);
    addInput();
  };
};
//Process Input
function addInput() {
  updateUI(currentLine);
};
function enterInput() {
  if(currentInput.length == 5) {
    currentLine = currentLine < 6 ? currentLine += 1 : 1;
    currentInput = [];
  } else {
    alert("Your word is not long enough!");
  };
};
document.addEventListener("keydown", processInput, false);
//Update UI
function updateUI(currentLine) {
  for(let clearBox = 1; clearBox < 5; clearBox++) {
    var currentClearBox = document.getElementById(currentLine + "_" + clearBox);
    currentClearBox.innerHTML = "";
  };
  for(let box = 1; box < currentInput.length + 1; box++) {
    var currentBox = document.getElementById(currentLine + "_" + box);
    currentBox.innerHTML = currentInput[box - 1].toUpperCase();
  };
};
//Check Answers
function checkAnswers() {
  for(let box = 1; box < 5; box++) {
    var currentBox = document.getElementById(currentLine + "_" + box);
    if(currentInput[box - 1] == currentWordArray[box-1]) {
      alert("P");
    };
  };
};
