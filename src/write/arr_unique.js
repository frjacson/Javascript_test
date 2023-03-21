//ES5 for unique the arr
function unique(arr) {
  var res = arr.filter((item, index) => {
    return arr.indexOf(item) === index;  // 返回第一次出现的
  })
  return res;
}

// ES6
var unique = (arr) => [...new Set(arr)];