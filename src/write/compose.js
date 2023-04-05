const middlewares = []

let mid1 = async (ctx, next) => {
  console.log("ctx1 begin")
  await next();
  console.log("ctx1 after")
}

let mid2 = async (ctx, next) => {
  console.log("ctx2 begin")
  await next();
  console.log("ctx2 after")
}

let mid3 = async (ctx, next) => {
  console.log("ctx3 begin")
  await next();
  console.log("ctx3 after")
}

const use = (fn) => {
  middlewares.push(fn);
}
use(mid1);
use(mid2);
use(mid3);

const compose = (middlewares) => {
  return  (ctx, next) => {
    dispatch(0);
    function  dispatch(i) {
      const fn = middlewares[i];
      if(! fn) return null;
      fn(ctx, function next() {
        dispatch(i+1)
      })
    }
  }
}

const fn = compose(middlewares);
fn();