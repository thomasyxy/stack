const Bagpipe = require('bagpipe');
const fs = require('fs');

let bagpipe = new Bagpipe();

function async () {
  fs.readFile('file1.txt', 'utf8', function(err, content) {
    if (err) {
      console.error(err)
      return false;
    }
    console.log(content);
  })
}

for (let i = 0; i < 100; i++) {
  bagpipe.push(async, function () {
    console.log(i);
  })
}

bagpipe.on('full', function (length) {
  console.warn(`队列拥堵，当前队列长度为：${length}`)
})
