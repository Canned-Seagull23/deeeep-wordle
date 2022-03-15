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
