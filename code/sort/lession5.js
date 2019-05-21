/*
  215. 数组中的第K个最大元素

  在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

  示例 1:
    输入: [3,2,1,5,6,4] 和 k = 2
    输出: 5

  示例 2:
    输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
    输出: 4

  说明: 你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
*/

/*
  解题思路：
    0、参数判断：
    1、数组降序排序，只排序到第k-1轮，返回数组中下标为k-1的元素
*/

export default (arr, k) => {
  // 参数判断
  if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') {
    throw TypeError("please transfer a array, thanks!");
  }

  let arrLen = arr.length;
  if (arrLen < 1) { throw TypeError("please transfer a not empty array, thanks!"); }

  if (typeof k !== 'number' ||
    isNaN(k) ||
    k !== Math.abs(k) ||
    k !== Math.ceil(k) ||
    k < 1 ||
    k > arrLen
  ) {
    throw TypeError(`please transfer a integer number k between 1 and ${arrLen}, thanks!`);
  }

  // 数组只有一个元素 并且 k = 1，直接返回第0个元素
  if (arrLen === 1 && k === 1) { return arr[0]; }

  // max 记录最大值，maxIndex 记录最大值出现的下标
  for (let i = 0, max, maxIndex; i < k; i++) {
    // 默认最大值为当前元素
    max = arr[i];
    // 从下一个元素开始遍历
    for (let j = i + 1; j < arrLen; j++) {
      // 如果有元素大于最大值，存储到max变量中，并把当前下标存储到maxIndex变量中
      if (arr[j] > max) {
        max = arr[j];
        maxIndex = j;
      }
    }

    // 如果有最大值，相互交换，只换一次
    if (max !== arr[i]) {
      arr[maxIndex] = arr[i];
      arr[i] = max;
    }
  }

  return arr[k - 1];
}