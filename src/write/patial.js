// partial function

const partial = (fn, ...args) => {
  return (...rest) => {
    console.log(rest);
    return fn(...args, rest);
  }
}
const add = (a, b, c) => {
  return a + b + c;
}

let partialAdd = partial(add, 1);
partialAdd(2, 3);