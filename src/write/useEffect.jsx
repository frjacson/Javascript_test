import React from 'react'

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count+1)
    }, 1000)
  }, [])  // bug useEffect 依赖于 count，但是没有将count放入数组中,则当前函数只会答应1
}