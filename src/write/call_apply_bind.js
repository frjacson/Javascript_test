Function.prototype.mycall = function (ctx, ...args) {
  ctx.fn = this;
  ctx.fn(...args);
  delete ctx.fn;
}

function show(...args) {
  console.log(this);
  console.log(args);
}
show("name1", "name2")
let obj = {name: 'qiweikai'}
show.mycall(obj, "name3", "name4")


Function.prototype.myApply = function (ctx, args=[]) {
  ctx.fn = this;
  ctx.fn(...args);
  delete ctx.fn;
}

Function.prototype.myBind = function (ctx, ...arg1) {
  return (...arg2) => {
    ctx.fn = this;
    ctx.fn(...arg1.concat(arg2));
    delete ctx.fn;
  }
}