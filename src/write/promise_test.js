//使用promnise实现隔秒打印的功能，打印到10停止打印
// function myPrint(number) {
//   return new Promise((resolve, reject) => {
//     if (number++ < 10) {
//       resolve(number);
//     } else {
//       resolve();
//     }
//   });
// }

async function timer(n) {
  for (let i = 1; i < n; i++) {
    console.log("ww", await _promise(i, i * 1000));
  }
}
function _promise(num, interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num);
    }, interval);
  });
}
timer(10);
