const listData = ["1111111", "22222222", "33333333", "44444444"];

(() => {
  const oContainer = document.querySelector(".container");
  const init = () => {
    render();
    bindEevnt();
  };

  function render() {
    const oUlList = document.createElement("ul");
    oUlList.className = "listContainer";
    oContainer.appendChild(oUlList);
    createList(oUlList);
  }
  function bindEevnt() {
    const oDraggableList = document.querySelector(".listContainer");
    const oDraggableItems = document.querySelectorAll(".draggable-item");
    // 在整个list上绑定dragover事件
    oDraggableList.addEventListener("dragover", handleDragOver, false);
    window.addEventListener("dragover", (e) => e.preventDefault(), false);
    oDraggableItems.forEach((item) => {
      item.addEventListener("dragstart", handleDragStart, false);
      item.addEventListener("dragend", handleDragEnd, false);
    });
  }
  function handleDragStart() {
    const item = this;
    // 实现滞后隐藏功能
    setTimeout(() => {
      item.classList.add("dragging");
    }, 0);
  }
  function handleDragEnd() {
    const item = this;
    item.classList.remove("dragging");
  }
  function handleDragOver(e) {
    e.preventDefault();
    const oDraggableList = this;
    const oDraggingItem = oDraggableList.querySelector(".dragging");
    // 找邻居节点，并且排除自身
    const oSigItems = oDraggableList.querySelectorAll(
      ".draggable-item:not(.dragging)"
    );
    const oSigItem = [...oSigItems].find(
      (item) => e.clientY <= item.offsetTop + item.offsetHeight / 2
    );
    // 交换顺序
    oDraggableList.insertBefore(oDraggingItem, oSigItem);
  }
  function createList(parentNode) {
    listData.forEach((item) => {
      const oLIitem = document.createElement("li");
      oLIitem.className = "draggable-item";
      oLIitem.draggable = true;
      oLIitem.innerHTML = `<p>${item}</p>`;
      parentNode.appendChild(oLIitem);
    });
  }
  init();
})();
