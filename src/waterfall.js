// waterfall 适用于后一个的输入依赖于前一个的情况。

const async = require('async');
const fs = require('fs');

async.waterfall([
  function(callback) {
    fs.readFile('file1.txt', 'utf8', function(err, content) {
      callback(err, content);
    })
  },
  function(arg1, callback) {
    fs.readFile(arg1.trim(), 'utf8', function(err, content) {
      callback(err, content);
    })
  },
  function(arg1, callback) {
    fs.readFile(arg1.trim(), 'utf8', function(err, content) {
      callback(err, content);
    })
  }
], function(err, result) {
  if(err) {
    console.error(err);
    return false;
  }
  console.log(result);
})
