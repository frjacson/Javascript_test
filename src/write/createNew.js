// how to imitation a new function

/**
 * 1. create a empty object, and redirect this to the object
 * 2. let the empty object's __proto__ direct the orgin, then do something
 * 3. return this object
 */
function my_new(originObj, ...args) {
  // check the originObj is a constructor
  if(!originObj.hasOwnProperty("prototype")) {
    throw new TypeError("You need give a constructor to my_new")
  }
  let obj = Object.create(originObj.prototype); // let obj's __proto__ direct the originObj
  let result = originObj.call(obj, ...args); // this -> obj
  if(result != null && (typeof result === 'object' || typeof result === 'function')) {
    return result;
  }
  return obj;
}


let obj = {
  'something': 12
}
console.log(obj.__proto__ === F.prototype.__proto__); // true Object
function F() {

}
console.log(F.prototype.__proto__); 
console.log(F.prototype.__proto__.__proto__);
// use my_new
let newObj = my_new(F) 
console.log(newObj.__proto__);