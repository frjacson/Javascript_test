
function createElement(tag, props, ...children) {
  // 如果是函数的话，我们还需要处理它的生命周期
  return {
    tag,
    props,
    children
  }
}
const React = {
  createElement
}
function isTextNode(fiber) {
  return fiber.tag === 'text'
}
function createRealDomElement(fiber) {
  if(isTextNode(fiber)) {
    // 代表是文本节点
    const textNode = document.createTextNode(fiber.props.value)
    return textNode
  }else {
    const domNode = document.createElement(fiber.tag)
    for(let prop in fiber.prop) {
      domNode.setAttribute(prop, fiber.props[prop])
    }
    return domNode;
  }
}

// 如果写fiber，实际上要写react的整个架构

const element=  React.createElement("div", {class: "wrapper"}, React.createElement("span", {class: "text"}, REact.createElement("text", {value: "helloworld"})))

let unitOfWork = null  // 代表每一个工作单元，当unitOfWork变为null时，代表没有fiber节点可以工作了
let workInProgressFiber = null
// 最基础的react元素

// React 将任务分为两个阶段,render 和 commit
// render 阶段是react 进行渲染工作，这个阶段是可以中断的，当有更高的优先级的任务插进来时，react会中断当前的渲染
// commit 阶段是react将所有的渲染内容直接投放到html页面中，此过程是不可以中断的

// 此函数代表执行某个fiber任务
// fiber叫做工作单元，是连续工作的最小单元
// 我们把一颗虚拟dom树拆分成n个fiber 工作单元，然后一个fiber工作完以后，
// 我们看一下浏览器是不是有空，没空的话，我们就停，有空的话我再去操作下一个fiber工作单元
function performUnitOfwork() {
  // 解析当前的fiber节点, 当前的fiber节点
  console.log("performUnitOfwork", unitOfWork)

  // 我们在这里，要创建真实DOM， 但是不是塞到页面去
  if(unitOfWork.dom) {
    // 有的话，代表已经创建过了，我们就不管

    // 把每个children都转换成fiber节点

  }else {
    //创建dom
    unitOfWork.dom = createRealDomElement(unitOfWork)
  }
  const { children } = unitOfWork.children
  console.log(children)
  // 转换children的时候，需要考虑fiber节点的连接顺序
  const child = children[0]
  let index = 0;
  let prevSibling = null
  while(index < children.length) {
    if(index === 0) {
      const fstChild= children[0]
      unitOfWork.child = {
        ...fstChild,
        placement: null
      } // 如果不是第一个元素，不回参与赋值的
      prevSibling = unitOfWork.child; 
    }else {
      // 如果索引不是第一个
      prevSibling.sibling = {
        ...children[index],
        placement: null
      }
    }
    index ++;
  }
  console.log("unitOfWork", unitOfWork);

  return unitOfWork.child;
}
function commitWork(rootFiber) {
  // 把rootFiber 塞到container里面去
  if(!rootFiber.child) {
    console.log("真个fiber树构建完")
    return ;
  }
  rootFiber.dom.appendChild(rootFiber.child.dom)

  // 递归调用
  commitWork(rootFiber.child);
}
// 开启整个的concurrent mode
function beginWork(deadline) {
  // 我们要判断当前帧是否还有空闲时间，如果没有空闲时间，我们就再往后推
  if(deadline.timeRemaining() < 1) {
    requestIdleCallback(beginWork)
  }else {
    if(unitOfWork) {
      const nextUnintOfWork = performUnitOfwork()
      console.log(nextUnintOfWork);
      unitOfWork = nextUnintOfWork;
      // 把下一个任务继续执行
      // 开启下一个任务
      if(nextUnintOfWork) {
        requestIdleCallback(beginWork)
      }else {
        // 代表所有fiber节点已经构建完毕了，整个fiber树也ok了
        console.log("是否是构建完了")
        commitWork(workInProgressFiber);
      }
    }
  }
}
// react自己实现了一个包，requestIdleCallback的作用是一样的，这里拿requestIdleCallback替代
// 他的作用是浏览器下一帧还有空闲时间的时候，去调用对应的回调函数
requestIdleCallback(beginWork) // 这句代码写了之后，代表任务开始了，即使没有调用render函数

// element 渲染到页面中去
function render(root, container) {
  // 创建真是dom
  // const realDom = document.createElement(root.tag);

  // // 处理属性
  // const { props, children } = props;
  // for (let prop in props) {
  //   realDom.setAttribute(prop, props[prop])
  // }

  // 递归渲染子元素
  // if(children) {
  //   children.forEach(child => {
  //     render(child);
  //   })
  // }

  // container.appendChild(reaDom)

  // 当我们调用render的时候，我们希望工作是开始了
  unitOfWork = {
    dom: container, // 第一次的时候，container是document.getElementById();
    children: [root], // root 是 reactCreate element 那个对象
    placement: null,
  }
  workInProgressFiber = unitOfWork
}
render(element, document.getElementsByTagName('body')[0])


// 把fiber加入进来，初衷是可中断渲染



