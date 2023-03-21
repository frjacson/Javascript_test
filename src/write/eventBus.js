// create eventBus(发布订阅模式)

class EventBus {
  constructor() {
    this._eventBus = {};
  }
  // addEvent
  addListener(eventId, fn) {
    let event = this._eventBus[eventId];
    if(!event) {
      this._eventBus[eventId] = [fn];
    }else {
      this._eventBus[eventId].push(fn);
    }
  }
  // emit
  emit(eventId) {
    const events = this._eventBus[eventId];
    if(!events) return ;
    for(let i = 0; i < events.length; i++) {
      events[i].apply(this, Array.from(arguments).slice(1));
    }
  }
  // removeEvent
  removeListener(eventId, fn) {
    const events = this._eventBus[eventId];
    if(!events) return ;
    for(let i = 0; i < events.length; i++) {
      if(events[i] === fn) {
        events.splice(i, 1);
      }
    }
  }
}

let eventBus = new EventBus();
let func1 = function (name, age) {
  console.log(name, age);
};
let func2 = function (name, age) {
  console.log(`hello, ${name}, ${age}`)
};
eventBus.addListener("name1", func1);
eventBus.addListener("name2", func2);
eventBus.emit("name1", "xiaohei", 12);