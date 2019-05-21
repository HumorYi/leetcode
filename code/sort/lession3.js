/*
  164. 最大间距

  给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。
  如果数组元素个数小于 2，则返回 0。

  示例 1:
    输入: [3,6,9,1]
    输出: 3
    解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。

  示例 2:
    输入: [10]
    输出: 0
    解释: 数组元素个数小于 2，因此返回 0。
    说明:

    你可以假设数组中所有元素都是非负整数，且数值在 32 位有符号整数范围内。
    请尝试在线性时间复杂度和空间复杂度的条件下解决此问题。
*/

/*
  解题思路：
    0、参数判断：

    方式一：在进行排序的同时得到最大间距，性能最高，时间复杂度 O(n^2)
      1、先进行排序（选择、冒泡。。。），在排序的同时，当i>0时，后一个数 - 前一个数，得到当前间距，用一个变量存储，反复比较，得到最大间距
      2、如果最大间距小于2，返回0，否则返回最大间距

    方式二：先进行排序sort，再进行遍历，性能较低,时间复杂度 O(n^2 + n)
*/

export default (arr) => {
  // 参数判断
  if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') {
    throw TypeError("please transfer a array, thanks!");
  }

  if (arr.length < 2) { return 0; }

  let maxSpace;
  let space;

  // min 记录最小值，minIndex 记录最小值出现的下标
  for (let i = 0, len=arr.length, min, minIndex; i < len; i++) {
    // 默认最小值为当前元素
    min = arr[i];
    // 从下一个元素开始遍历
    for (let j = i+1; j < len; j++) {
      // 如果有元素小于最小值，存储到min变量中，并把当前下标存储到minIndex变量中
      if (arr[j] < min) {
        min = arr[j];
        minIndex = j;
      }
    }

    // 如果有最小值，相互交换，只换一次
    if (min !== arr[i]) {
      arr[minIndex] = arr[i];
      arr[i] = min;
    }

    if (i > 0) {
      space = arr[i] - arr[i-1];
      if (!maxSpace || space > maxSpace) { maxSpace = space; }
    }
  }

  return maxSpace > 2 ? maxSpace : 0;
}