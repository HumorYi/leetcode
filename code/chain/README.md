# 链表

```
特点：非连续存储

ex: a -> b -> c -> d -> e

非 JavaScript 本身拥有，需要借助 class 来实现
class Node {
  constructor(val, next=undefined) {
    this.val = val
    this.next = next
  }
}

时间复杂度：
	增删改查：
		增：O(1)
		删：O(1)
		改：O(1)
		查：O(n) 跳表可以优化这个复杂度 0(lgn)，后续补充

扩展：
	1、react 的 fiber 架构就是存储的Virtual DOM从 树 变成了 链表
    2、vue 内部的 keep-alive，缓存算法 LRU，用的也是链表
    3、链表和数组是最基础的数据结构，链表 + 数组 组装成了别的数据结构
```

