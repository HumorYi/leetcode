/*
  获取最大堆

  堆：
    1、必须是完全二叉树：https://baike.baidu.com/item/%E5%AE%8C%E5%85%A8%E4%BA%8C%E5%8F%89%E6%A0%91/7773232?fr=aladdin
    2、任一结点的值是其子树所有结点的最大值或最小值
*/

/*
  解题思路：
    0、参数判断：
    1、js并没有二叉树结果，使用数组来模拟二叉树
    2、根据父节点与子节点的关系来对堆反复进行排序，其实只是交换两个节点的值
*/


class Heap {

  constructor(arr) {

    if (!Array.isArray(arr)) {
      throw TypeError('please transfer a array, thanks!');
    }

    this.data = this.sortHeap(arr);
    this.max = this.data.length - 1;
  }

  /**
   * @desc 查找指定的值是否在堆中
   *
   * @param {any} val 要查找的值
   * @param {Number} i 堆节点下标
   *
   * @returns {Boolean}
   */
  findData(val, i = 0) {

    // 要查找的值 大于 最大堆顶点值 或 查找下标超出堆的查找范围（查找子树）
    if (val > this.data[i] || i > this.max) {
      return false;
    }
    else if (val === this.data[i]) { // 在堆节点中刚好找到匹配的值
      return val;
    }
    else {
      // 反复查找堆的左右子树
      return this.findData(val, i * 2 + 1) || this.findData(val, i * 2 + 2);
    }

  }

  /**
   * @desc 堆排序
   *
   * @param {Array} arr 要排序的数组
   * @param {String} type "min" or "max" default: max
   *
   * @returns {Array} 排序好的数组
   */
  static sortHeap(arr, type = "max") {

    if (!Array.isArray(arr)) {
      throw TypeError('please transfer a array, thanks!');
    }

    if (arr.length < 2) {
      return arr;
    }

    let sortArr = [...arr],
        sortArrLen = sortArr.length,
        size = sortArrLen - 1,
        sortType = type === "max" ? Heap.setMaxHeap : Heap.setMinHeap;
    ;

    // 得到首次最大堆
    for (let i = Math.floor(sortArrLen / 2) - 1; i >= 0; i--) {
      sortType(sortArr, i, size);
    }

    // 堆排序：第0个节点和最后一个节点交换值，获取下一次的最大堆，反复此步骤，直到只剩一个节点
    for (let j = 0; j < size; j++) {
      Heap.swap(sortArr, 0, size - j);
      sortType(sortArr, 0, size - j - 1);
    }

    return sortArr;
  }

  /**
   * @desc 设置最大堆
   *
   * @param {Array} arr 待排序的堆数组
   * @param {Number} i 当前元素下标
   * @param {Number} size 待排序的堆大小
   *
   * @returns {void}
   */
  static setMaxHeap(arr, i, size) {

    let largest = i,
        leftIndex = i * 2 + 1,
        // rightIndex = i * 2 + 2,
        rightIndex = leftIndex + 1
    ;

    if (leftIndex <= size && arr[leftIndex] > arr[largest]) {
      largest = leftIndex;
    }

    if (rightIndex <= size && arr[rightIndex] > arr[largest]) {
      largest = rightIndex;
    }

    if (largest !== i) {
      Heap.swap(arr, i, largest);
      Heap.setMaxHeap(arr, largest, size);
    }

  }

  /**
   * @desc 设置最小堆
   *
   * @param {Array} arr 待排序的堆数组
   * @param {Number} i 当前元素下标
   * @param {Number} size 待排序的堆大小
   *
   * @returns {void}
   */
  static setMinHeap(arr, i, size) {

    let least = i,
        leftIndex = i * 2 + 1,
        // rightIndex = i * 2 + 2,
        rightIndex = leftIndex + 1
    ;

    if (leftIndex <= size && arr[leftIndex] < arr[least]) {
      least = leftIndex;
    }

    if (rightIndex <= size && arr[rightIndex] < arr[least]) {
      least = rightIndex;
    }

    if (least !== i) {
      Heap.swap(arr, i, least);
      Heap.setMinHeap(arr, least, size);
    }

  }

  /**
   * @desc 交换堆数组中两个下标的值
   *
   * @param {Array} arr 堆数组
   * @param {Number} i1 下标1
   * @param {Number} i2 下标2
   *
   * @returns {void}
   */
  static swap(arr, i1, i2) {

    if (arr[i1] !== arr[i2]) {

      let tmp = arr[i1];
      arr[i1] = arr[i2];
      arr[i2] = tmp;
    }

  }

}

export default (arr) => {

  return Heap.sortHeap(arr);

}