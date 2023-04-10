// ES5  flat

function flat(arr) {
  var newArr = [];
  for(let i = 0; i < arr.length; i++) {
    if(Array.isArray(arr[i])) {
      newArr = newArr.concat(flat(arr[i]));
    }else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

// ES6
function flatten(arr) {
  // while(arr.some(item => Array.isArray(item))) {
  //   arr = [].concat(...arr);
  //   console.log(arr);
  // }
  // return arr;
  return [].concat(...arr);
}
let arr1 = flatten([1, 2, [1,32, 3], [4]]);
console.log(arr1);