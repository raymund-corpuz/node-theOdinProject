const _ = require("lodash");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const chunked = _.chunk(numbers, 3);

console.log("Original:", numbers);
console.log("Chunked:", chunked);
