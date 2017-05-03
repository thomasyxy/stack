const Wind = require('wind');
const fs = require('fs');

let arr1 = [3,1,9,5,6,4,8,2];
let arr2 = [3,1,9,5,6,4,8,2];

let compare = function(x, y) {
  return x - y;
}

let swap = function(a, i, j) {
  let t = a[i];
  a[i] = a[j];
  a[j] = t;
}

let swapAsync = eval(Wind.compile('async', function (a, i, j) {
  $await(Wind.Async.sleep(20));
  let t = a[i];
  a[i] = a[j];
  a[j] = t;
  paint(a)
}))

let bubbleSort = function (array) {
  for(let i = 0; i < array.length; i++) {
    for(let j = 0; j < array.length; j++) {
      if(compare(array[j], array[j + 1]) > 0) {
        swap(array, j, j + 1);
      }
    }
  }
}

let bubbleSortWind = eval(Wind.compile('async', function (array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (compare(array[j], array[j + 1]) > 0) {
        $await(swapAsync(array, j, j + 1));
      }
    }
  }
}))

bubbleSort(arr1);

console.log(arr1); //[ 1, 2, 3, 4, 5, 6, 8, 9 ]

bubbleSortWind(arr2);

console.log(arr2); //[ 1, 2, 3, 4, 5, 6, 8, 9 ]
