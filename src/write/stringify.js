/**
 * 1. Boolean | Number | String类型会自动转换成原始值
 * 2. undefined，函数、以及symbol类型，会被忽略(出现在非数组对象的属性值中)，或者被转换成null(出现在数组中)
 * 3. 不可枚举的属性会被忽略
 * 4. 如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环引用，属性会被忽略
 */
function jsonStringify(obj) {
  let type = typeof obj;
  if(type !== "object") {
    if(/string|undefined|function/.test(type)) {
      obj = `"${obj}"`;
    }
    return String(obj);
  }else {
    let json = [];
    let arr = Array.isArray(obj);
    for(let k in obj) {
      let v = obj[k];
      let type = typeof v;
      if(/string|undefined|function/.test(type)) {
        v = `"${v}"`;
      }else if(type === "object") {
        v = jsonStringify(v);
      }
      json.push((arr ? "" : `"${k}":`) + String(v));
    }
    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
  }
}

console.log(jsonStringify({x : 5}));
console.log(jsonStringify([1, "false", false]));

console.log(jsonStringify({
  user: {name: 1, age: 2},
  arr: [{name: 1}, {name: 2}, {name: 3}]
}))

// 将stringify 还原 模仿JSON.parse(方法)

// let jsonStr = jsonStringify(jsonStringify({x : 5}))
// let json = (new Function('return ' + jsonStr))();
// console.log(json);