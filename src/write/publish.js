/**
 * 1. 创建Vue构造函数
 *  - 1.1 调用observar函数，该函数的作用是对数据进行劫持，增加getter， setter
 *  - 1.2 手写compileh函数，该函数的作用是从模板里面提取信息 {{}} 和 v-model
 *  - 1.3 创建发布者dep的构造函数，如果数据发生改变，发布者会遍历遍历内部的数组，通知订阅者修改数据
 *  - 1.4 创建订阅者watcher构造函数，如果有数据变化，发布者就会通知订阅者，订阅者存在update方法进行修改
 */

function Vue(options) {
  // this 代表 Vue 的实例对象，本例中就是 vm
  observer(this, options.data);
  this.$el = options.el;
  compile(this);
}

// 用于模版提取信息
function compile(vm) {
  var el = document.querySelector(vm.$el);
  var documentFragment = document.createDocumentFragment(); // 创建一个空的文档碎片
  var reg = /\{\{(.*)\}\}/; //匹配{{}}
  while(el.childNodes[0]) {
    var child = el.childNodes[0]; // 将第一个子节点存储到child
    if(child.nodeType == 1) {
      // 如果能进入到if，说明该节点是一个元素节点
      for(var key in child.attributes) {
        // 遍历该元素节点的每一个属性，拿到的是 type="text" v-model="msg"
        var attrName = child.attributes[key].nodeName;
        if(attrName === 'v-model') {
          var vmKey = child.attributes[key].nodeValue;
          child.addEventListener('input', function(event) {
            // 获取用户输入的值，然后改变 vm 里面的 msg 属性对应的值，注意这里会触发 setter
            vm[vmKey] = event.target.value;
          })
        }
      }
    }
    if(child.nodeType == 3) {
      // 如果能进到这个if，说明节点是文本节点
      if(reg.test(child.nodeValue)) {
        var vmKey = RegExp.$1; // 获取正则里面的捕获值，也就是msg
        // 实力话一个Watcher(订阅者), 接受三个参数,Vue, 文本节点，捕获值
        new Watcher(vm, child, vmKey);
      }
    }
    // 将第一个节点添加到文档碎片中
    DocumentFragment.appednChild(el.childNodes[0]);
  }
  // 将文档碎片中节点重新添加到el下
  el.appednChild(documentFragment);
}

// 新建发布者构造函数
function Dep() {
  this.subs = [];
}

Dep.prototype = {
  // 将watcher添加到发布者内部的数组里面
  addSub: function (sub) {
    this.subs.push(sub);
  },
  notify: function() {
    this.subs.forEach(function (sub) {
      sub.update();
    })
  }
}

// 新建观察者/订阅者Wather构造函数
function Watcher(vm, child, vmKey) {
  this.vm = vm;
  this.child = child;
  this.vmKey = vmKey;
  Dep.target = this; // 将观察者实例对象添加给Dep.target
  this.update();
  Dep.target = null;
}
Watcher.prototype = {
  // 相当于：{{ msg }}.nodeValue = this.vm['msg']
  // 这样就更新了文本节点的值，由于这里在获取 vm.msg，所以会触发 getter
  update: function() {
    this.child.nodeValue = this.vm[this.vmKey];
  }
}

// 数据侦听
function observer(vm, obj) {
  var dep = new Dep(); // 新增一个发布者:发布者的作用是告诉订阅者数据已经更改
  // 遍历数据
  for (var key in obj) {
    // 将数据的每一项添加到 vm 里面，至此，vm 也有了每一项数据
    // 但是不是单纯的添加，而是设置了 getter 和 setter
    // 在获取数据时触发 getter，在设置数据时触发 setter
    Object.defineProperties(vm, key, {
      get() {
        console.log("触发 getter")
        if(Dep.target) {
          dep.addSub(Dep.target); // 往发布者的数组里面添加订阅者
        }
        return obj[key];
      },
      set(newVal) {
        console.log("触发 setter")
        obj[key] = newVal;
        dep.notify(); // 发布者发出消息，通知订阅者修改了数据
      }
    })
  }
}