const Step = require('step');
const fs = require('fs');

// 结果分组

function test() {
  return function () {
    console.log(arguments)
    console.log(arguments[0])
    console.log(arguments[1])
  }
}


Step(
  function readDir() {
    fs.readdir(__dirname, this);
  },
  function readFiles(err, results) {
    if(err) throw err;

    let group = this.group();
    results.forEach(function(filename) {
      if(/\.txt$/.test(filename)) {
        fs.readFile(`${__dirname}/${filename}`, 'utf8', test.apply(this));
      }
    });
  },
  function showAll(err, files) {
    if(err) throw err;
    console.dir(files);
  }
);
