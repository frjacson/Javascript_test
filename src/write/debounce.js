// create a debounce function

function debounce(fn, delay=200) {
  let timer = null;
  return function(...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay)
  }
}

// create a throttle function
function throttle(fn, wait=200) {
  let startTime = 0;
  return function (...arg) {
    const nowTime = new Date() - startTime;
    if(nowTime > wait) {
      fn.apply(this, args);
      startTime = nowTime;
    }
  }
}

/** test */
// const handleClick = () => {
//   console.log(1);
// }
// document.addEventListener('click', debounce(handleClick))
