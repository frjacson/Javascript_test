const imgList = document.querySelectorAll('img');
let index = 0;
function lazyLoad() {
  // get the explore view height
  const viewPortHeight = window.innerHeight;
  for(let i = 0; i < imgList.length; i++) {
    // 可视化区域高度减去图片顶部 距离可视化区域顶部的高度
    const distance = viewPortHeight - imgList[i].getBoundingClientRect().top;
    if(distance >= 0) {
      imgList[i].src = imgList[i].getAttribute("data-src");
      index = i + 1;
    }
  }
}
// debounceFunction
function debounce(fn, delay=200) {
  let timer = null;
  return (...args) => {
    if(!timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}
window.addEventListener("scroll", debounce(lazyLoad, 200));