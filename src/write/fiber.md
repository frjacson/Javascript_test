### React Fiber

---

> 从设计方面谈，React16以后，包括concurrent mode, reconcile, schedule 等一系列操作设计的统称，我们称之为fiber架构
>
> 从结构层面： Fiber是一种数据结构，那么基于这种结构的工作模式叫做fiber架构，unit of work

#### 虚拟`dom`

> React 里的虚拟dom，是react.createElement创建的对象