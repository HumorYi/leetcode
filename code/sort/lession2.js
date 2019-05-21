/*
  选择排序
*/

/*
  解题思路：
    0、参数判断：
    1、从头开始，每次都选择最小的数字到前面，这就是选择排序
    2、外层循环倒序遍历，因为内层循环遍历完之后，最小的肯定在最前面，所以不需要再跟前面已经排序好的进行比较，这就是优化边界（i）
    3、内层循环顺序遍历，遍历的开始条件为 外层循环的优化边界（j=i+1）
    4、默认最小值为外层循环中当前元素，内层中如果当前元素小于最小值，存储到最小值变量中并存储下标；
    5、内层循环遍历结束，判断是否有找到比外层当前元素还小的最小值元素，如果有，相互互换，没有就继续下一轮
*/

export default (arr) => {
  // 参数判断
  if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') {
    throw TypeError("please transfer a array, thanks!");
  }
  
  if (arr.length < 2) { return arr; }

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
  }

  return arr;
}