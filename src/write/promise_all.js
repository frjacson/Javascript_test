// 第一个参数 可迭代对象
Promise.myAll = (iterableObj) => {
  return new Promise((reslove, reject) => {
    let result = [];
    let count = 0;
    let finisned = 0;
    for(let item of iterableObj) {
      let index = count;
      if(item instanceof Promise) {
        item.then(data => {
          result[index] = data
          finished += 1;
          if(finisned === count) {
            reslove(result)
          }
        }).catch((err) => {
          reject(err)
        })
      }else {
        // 不是promsie
        result[count] = item
      }
      count += 1;
    }
  })
}
const pro1 = new Promise(1);
const pro2 = new Promise().then((res) => {
  setTimeout(() => {
    console.log(res)
  }, 1000)
})
console.log(Promise.myAll([pro1, pro2]))