const Step = require('step');
const fs = require('fs');

// 串行执行

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
    console.log(`串行执行: ${content}`);
  }
)

// 并行执行

Step(
  function readFile1() {
    fs.readFile('file1.txt', 'utf8', this.parallel());
    fs.readFile('file2.txt', 'utf8', this.parallel());
  },
  function done(err, content1, content2) {
    console.log(`并行执行: file1='${content1.trim()}',file2='${content2.trim()}'`);
  }
);
