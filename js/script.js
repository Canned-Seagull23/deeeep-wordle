//Variables
const words = ["depth",
               "boost",
               "shark",
               "ocean",
               "charge",
               "whale",
               "squid",
               ];
//Utility Functions
const random = {
  integer: function(max, min) {
    return Math.floor(Math.random() * max) + min;
  },
  object: function(array) {
    return array[random.integer(array.length)];
  }
};
//Start a new Wordle
var currentWord = random.object(words);
//Regenerate Wordle
const generateNewWord = () => {
  currentWord = random.object(words);
};
//Current input
var currentInput = [];
//Detect Input
var keypressed = {};
const processInput = (keyPressed) => {
  var key = keyPressed.key.toLowerCase();
  if(key.code == "backspace") {
    currentInput.pop();
  } else if(currentInput.length < 5) {
    currentInput.push(key);
  };
  console.log(currentInput);
};
document.addEventListener("keydown", processInput, false);
