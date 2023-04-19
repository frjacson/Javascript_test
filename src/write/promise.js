const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(func) {
    this.status = PENDING;
    this.result = null;
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    try {
      func(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err);
    }
  }
  resolve(result) {
    // 模仿异步
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.result = result;
        this.resolveCallbacks.forEach((callback) => {
          callback(result);
        });
      }
    });
  }

  reject(result) {
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.result = result;
        this.rejectCallbacks.forEach((callback) => {
          callback(result);
        });
      }
    });
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "fucntion" ? onFulfilled : () => {};
    onRejected = typeof onRejected === "function" ? onRejected : () => {};
    if (this.status === PENDING) {
      this.resolveCallbacks.push(onFulfilled);
      this.rejectCallbacks.push(onRejected);
    }
    if (this.status === FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.result);
      });
    }
    if (this.status === REJECTED) {
      setTimeout(() => {
        onRejected(this.result);
      });
    }
  }
}

let test = new MyPromise((resolve, reject) => {
  resolve("hello");
});
test.then(
  (res) => {
    console.log(1);
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
