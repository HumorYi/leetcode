# 哈希

```
特点：数组 + 链表 组成

缺点：占用空间太大 无序

ex: a经过了hash函数，变成⼀个数字 数字作为索引，存在数组里
	const arr = new Array(10).fill('')
    function hash(s){
    	return s.charCodeAt()*7%10
    }
    arr[hash(s)]

时间复杂度：
	增删改查：
		增：O(1)
		删：O(1)
		改：O(n)
		查：O(1)


```

