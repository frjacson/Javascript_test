// curry
// curry(add)(1)(2, 3)(3)()
const add = (...args) => {
  return args.reduce((a, b) => a + b);
};

const curry = (fn) => {
  const args = [];
  return function backTracking(...rest) {
    if (rest.length === 0) {
      return fn(...args);
    } else {
      args.push(...rest);
      return backTracking;
    }
  };
};

const value = curry(add)(1)(2, 3)(3)();
console.log(value);
