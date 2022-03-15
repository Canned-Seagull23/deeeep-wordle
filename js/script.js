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
//Detect Input
var keypressed = {};
const processInput = (key) => {
  keypressed.key = true;
  console.log(key);
};
document.addEventListener("keyup", processInput);
