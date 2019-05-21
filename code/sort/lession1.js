/*
  冒泡排序
*/

/*
  解题思路：
    0、参数判断：
    1、就像鱼吐出的气泡，大的会跳过小的先浮到水面，小的后浮到水面，这就是冒泡
    2、外层循环倒序遍历，因为内层循环遍历完之后，最大的肯定在最后面，所以不需要再跟后面已经排序好的进行比较，这就是优化边界（i）
    3、内层循环顺序遍历，遍历的截止条件为 外层循环的优化边界（j<i）
    4、内层中如果当前元素大于下一个元素，互相交换值，继续判断，否则遍历下一个
*/

export default (arr) => {
  // 参数判断
  if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') {
    throw TypeError("please transfer a array, thanks!");
  }

  if (arr.length < 2) { return arr; }

  // tmp作为临时变量，帮助两个元素相互交换彼此的值
  for (let i = arr.length - 1, tmp; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      // 如果当前元素比下一个元素大，相互交换，每次都交换
      if (arr[j] > arr[j+1]) {
        tmp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = tmp;
      }
    }
  }

  return arr;
}