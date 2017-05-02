const Step = require('step');
const fs = require('fs');

let compare = function(x, y) {
  return x - y;
}

let swap = function(a, i, j) {
  let t = a[i];
  a[i] = a[j];
  a[j] = t;
}

let bubbleSort = function (array) {
  for(let i = 0; i < array.length; i++) {
    for(let j = 0; j < array.length; j++) {
      if(compare(array[j], array[j + 1], > 0)) {
        swap(array, j, j + 1);
      }
    }
  }
}
