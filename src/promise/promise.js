var fs = require('fs')

var Defferred = function () {
  this.promise = new Promise();
};

// 成功态
Defferred.prototype.resolve = function (obj) {
  var promise = this.promise;
  var handler;
  while (handler = promise.queue.shift()) {
    if (handler && handler.fulfilled) {
      var ret = handler.fulfilled(obj);
      if (ret && ret.isPromise) {
        ret.queue = promise.queue;
        this.promise = ret;
        return;
      }
    }
  }
};

// 失败态
Defferred.prototype.reject = function (err) {
  var promise = this.promise;
  var handler;
  while (handler = promise.queue.shift()) {
    if (handler = promise.fulfilled) {
      var ret = handler.fulfilled(obj);
      if (ret && ret.isPromise) {
        ret.queue = promise.queue;
        this.promise = ret;
        return;
      }
    }
  }
};

Defferred.prototype.callback = function () {
  var that = this;
  return function (err, file) {
    if (err) {
      return that.reject(err);
    }
    that.resolve(file);
  }
};

var Promise = function () {
  this.queue = [];
  this.isPromise = true;
};

Promise.prototype.then = function (fulfilledHandler, errorHandler, progressHandler) {
  var handler = {};
  if (typeof fulfilledHandler === 'function') {
    handler.fulfilled = fulfilledHandler;
  }
  if (typeof errorHandler === 'function') {
    handler.error = errorHandler;
  }
  this.queue.push(handler);
  return this;
};

// 读取文件，第二个文件依赖第一个文件，验证可行性
var readFile1 = function (file, encoding) {
  var defferred = new Defferred();
  fs.readFile(file, encoding, defferred.callback());
  return defferred.promise;
};

var readFile2 = function (file, encoding) {
  var defferred = new Defferred();
  fs.readFile(file, encoding, defferred.callback());
  return defferred.promise;
};

readFile1('./file1.txt', 'utf8').then(function (file1) {
  debugger
  return readFile2(file1.trim(), 'utf8');
}).then(function (file2) {
  console.log(file2)
})
