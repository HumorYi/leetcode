/*
  451. 根据字符出现频率排序

  给定一个字符串，请将字符串里的字符按照出现的频率降序排列。

  示例 1:
    输入: "tree"
    输出: "eert"
    解释:
      'e'出现两次，'r'和't'都只出现一次。
      因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。

  示例 2:
    输入: "cccaaa"
    输出: "cccaaa"
    解释:
      'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
      注意"cacaca"是不正确的，因为相同的字母必须放在一起。

  示例 3:
    输入: "Aabb"
    输出: "bbAa"
    解释:
      此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
      注意'A'和'a'被认为是两种不同的字符。
*/

/*
  解题思路：
    0、参数判断：
    1、解法有很多种，如果要最高性能，需要使用堆排序
    2、js没有堆数据结构，使用数组来模拟
    3、使用Map数据结构，把相同的字符存为一个key，值为字符出现的次数，
    4、把每个字符出现的次数存储到堆数组中，用于排序
    5、每个字符出现的次数可能不同，也可能相同，
    6、在输出时，为保证准确得到对应的字符，需要把前面已经获取的字符从Map中删掉
*/

class Heap {

  constructor(str) {

    // 参数判断
    if (typeof str !== "string") {

      throw TypeError('please transfer a string, thanks!');

    }

    let map = new Map();

    for (let i = 0, strLen = str.length, item; i < strLen; i++) {

      item = str[i];
      map.set(item, map.has(item) ? map.get(item) + 1 : 1);

    }

    this.map = map;
    this.data = Array.from(map.values());
  }

  /**
   * @desc 输出排序好的堆
   *
   * @returns {String} 排序好的堆
   */
  toString() {

    let arr = Heap.sortHeap(this.data),
        outStr = ""
    ;

    while (arr.length) {

      let maxVal = arr.pop();

      for (let [key, val] of this.map) {

        if (val === maxVal) {

          outStr += key.repeat(val);

          // 避免后续键值重复时取到的是前面的key
          this.map.delete(key);

          break;
        }

      }

    }

    return outStr;

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

export default (str) => {

  // 参数判断
  if (typeof str !== "string") {

    throw TypeError('please transfer a string, thanks!');

  }

  return new Heap(str).toString();

}