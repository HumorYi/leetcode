# 数组

```
特点：连续存储

ex: [1, 2, 3, 4, 5, 6]

时间复杂度:
    增删改查：
        增：O(n)
        删：O(n)
        改：O(1)
        查：索引 => O(1) ，值 => O(n)

    api:
        includes：O(n)
        splice：删 => O(n)，改 => O(1)，删 + 插 => O(n)
        unshift：O(n)
```

