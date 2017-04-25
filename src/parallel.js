// parallel适用于无依赖的异步并行执行

const async = require('async');
const fs = require('fs');

async.parallel([
  function(callback) {
    fs.readFile('file1.txt', 'utf8', callback);
  },
  function(callback) {
    fs.readFile('file2.txt', 'utf8', callback);
  }
], function(err, result) {
  if(err) {
    console.err(err);
    return false;
  }
  console.log(result);
})
