const fs = require('fs');
const async = require('async');

async.series([
  function(callback) {
    fs.readFile('./file1.txt', 'utf8', callback);
  },
  function(callback) {
    fs.readFile('./file2.txt', 'utf8', callback);
  }
], function(err, results) {
  console.log(results)
})
