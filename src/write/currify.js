// function currify

const add = (...args) => {
  return args.reduce((a, b) => {
    return a + b;
  });
}

const curry = (fn) => {
  let args = []; // 存储传入的参数
  return function generator(...rest) {
    if(rest.legnth === 0) {
      return fn(...args);
    }else {
      args.push(...rest);
      return generator;
    }
  }
}

const curryValue = curry(add)(1)(2, 3)(3)();