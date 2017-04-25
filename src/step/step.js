const Step = require('step');
const fs = require('fs');

Step(
  function readFile1() {
    fs.readFile('file1.txt', 'utf8', this);
  },
  function readFile2(err, content) {
    fs.readFile(content.trim(), 'utf8', this);
  },
  function done(err, content) {
    if(err) {
      console.error(err);
    }
    console.log(content);
  }
)
