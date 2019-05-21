/*
  41. 缺失的第一个正数

  给定一个未排序的整数数组，找出其中没有出现的最小的正整数。

  示例 1:
    输入: [1,2,0]
    输出: 3

  示例 2:
    输入: [3,4,-1,1]
    输出: 2

  示例 3:
    输入: [7,8,9,11,12]
    输出: 1

  说明: 你的算法的时间复杂度应为O(n)，并且只能使用常数级别的空间。
*/

/*
  解题思路：
    0、参数判断：
    1、取出大于等于1的数
    2、如果没有数据，直接返回1
    3、如果有数据，进行升序排序，如果第0个元素不是1，返回1；否则如果当前元素与下一个元素相减商不为1，返回当前元素+1；否则返回最后一个元素+1
*/

export default (arr) => {
  // 参数判断
  if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') {
    throw TypeError("please transfer a array, thanks!");
  }

  let arrLen = arr.length;

  // 简单判断，如果符合就返回
  if (arrLen === 0) { return 1; }
  else if (arrLen === 1) { return arr[0] === 1 ? 2 : 1; }

  // 获取正整数
  let integerArr = arr.filter(item => item >= 1);
  let integerArrLen = integerArr.length;
  // 没有正整数时返回1
  if (integerArrLen === 0) { return 1; }


  // 方式二：选择排序，在排序的同时进行匹配处理，代码量多，性能高
  // 升序排序，便于从左到右取最小值
  for (let i = 0, min, minIndex; i < integerArrLen; i++) {
    min = integerArr[i];
    for (let j = i + 1; j < integerArrLen; j++) {
      if (integerArr[j] < min) {
        min = integerArr[j];
        minIndex = j;
      }
    }

    // 注意：这里的min就是arr[i]，因为只需做判断，无需做存储，
    // 在符合下列条件的情况下，直接返回结果，无需再存储原数组，提升性能
    // 如果找到的最小值不为1，则直接返回1
    if (i === 0 && min !== 1) { return 1; }
    else if (i > 0 && min - integerArr[i - 1] !== 1) { return integerArr[i - 1] + 1; }

    // 交互对应位置的值
    if (min !== integerArr[i]) {
      integerArr[minIndex] = integerArr[i];
      integerArr[i] = min;
    }
  }

  /* 方式一：数组api排序，代码量少，性能低
  // 升序排序，便于从左到右取最小值
  integerArr.sort((a, b) => a - b);
  // 如果第0位不是1，则返回1
  if (integerArr[0] !== 1) { return 1; }

  for (let i = 1; i < integerArrLen; i++) {
    // 当前位于上一位相减差不等于1，表明不是连续的正整数，返回上一位元素+1
    if (integerArr[i] - integerArr[i - 1] !== 1) { return integerArr[i - 1] + 1; }
  } */

  // 正整数数组中所有元素都是连续的，返回最后一个元素+1
  return integerArr[integerArrLen - 1] + 1;
}