// my_forEach

// need a callable function and a this value
// Array.forEach((item, index, this) => {})
// forEach is not return somebody;
Array.prototype.forEach2 = function(fn, thisAg) {
  console.log(this); // when someObj calls, this direct that;
  for(let i = 0; i < this.length; i++) {
    fn.call(thisAg, this[i], i, this);
  }
}

const arr = [1, 2, 3];
arr.forEach2((item, index, _this) => {
  console.log(item, index, _this); // _this is direct to the arr;
})