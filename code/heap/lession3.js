/*
  313. 超级丑数

  编写一段程序来查找第 n 个超级丑数。

  超级丑数是指其所有质因数都是长度为 k 的质数列表 primes 中的正整数。

  示例:
    输入: n = 12, primes = [2,7,13,19]
    输出: 32
    解释: 给定长度为 4 的质数列表 primes = [2,7,13,19]，前 12 个超级丑数序列为：[1,2,4,7,8,13,14,16,19,26,28,32] 。

  说明:
    1 是任何给定 primes 的超级丑数。
     给定 primes 中的数字以升序排列。
    0 < k ≤ 100, 0 < n ≤ 10^6, 0 < primes[i] < 1000 。
    第 n 个超级丑数确保在 32 位有符整数范围内。
*/

/*
  解题思路：
    0、参数判断：
    1、了解基本概念：质数、因数、质因数、丑数
    2、计算任意正整数的质因数
    3、判断质因数是否在指定质因数范围内 或者 该正整数是否质数
      如果是，则证明该正整数是超级丑数；

      这一步是提升性能的关键点，如果使用数组api，遍历数组所有元素，性能低，
        而堆排序是查找性能最高的方式，查找时会首先遍历顶节点（最大/小值），
          不符合再遍历子节点，查找值的顺序是有序的，效率高，性能高

    4、判断是否达到指定个数n，达到则返回对应的超级丑数
*/

class Heap {

  constructor(arr) {

    if (!Array.isArray(arr)) {
      throw TypeError('please transfer a array, thanks!');
    }

    this.data = Heap.sortHeap(arr);
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
    /* for (let j = 0; j < size; j++) {
      Heap.swap(sortArr, 0, size - j);
      sortType(sortArr, 0, size - j - 1);
    } */

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

class Ugly {

  constructor(n, primes) {

    // 参数判断
    if (typeof n !== "number") {
      throw TypeError('please transfer a number, thanks!');
    }
    if (n < 0 || n > Math.pow(10, 6)) {
      throw TypeError('please transfer a number between 0 and 10^6, thanks!');
    }

    if (!Array.isArray(primes)) {
      throw TypeError('please transfer a array, thanks!');
    }

    let primesLen = primes.length;

    if (0 > primesLen || primesLen > 100) {
      throw TypeError('please transfer a array length between 0 and 100, thanks!');
    }

    primes.forEach((prime, index) => {

      if (!Number.isInteger(prime) || prime <= 0 || prime >= 1000) {
        throw TypeError(`primes 中第 ${index} 位置值为：${prime} 必须是一个 [0, 1000] 之间的正整数`);
      }

    });

    this.n = n;
    this.primes = new Heap(primes);
  }

  /**
   * @desc 获取第n个超级丑数
   *
   * @param {Number} n 是个数，不是下标
   *
   * @returns {Number} 第n个超级丑数
   */
  getSuperUgly(n) {

    // 参数判断
    if (typeof n !== "number") {
      throw TypeError('please transfer a number, thanks!');
    }

    // 超级丑数列表
    let superUglyList = [1],
        superUglyListLen = superUglyList.length,
        startIndex = 2,
        primes = this.primes
    ;

    while (superUglyListLen < n) {

      let arr = Ugly.getPrimes(startIndex),
          arrLen = arr.length,
          k = 0
      ;

      for (; k < arrLen; k++) {

        if (!primes.findData(arr[k])) {
          break;
        }

      }

      /**
       * k === arrLen 有两种情况
       *  1、当前这个数的所有质因数都在指定列表中
       *  2、当前这个数没有质因数
      */
      if (k === arrLen &&
        ( arrLen > 0 ||
          arrLen === 0 && primes.findData(startIndex)
        )
      ) {
        superUglyList.push(startIndex);
        superUglyListLen++;
      }

      startIndex++;
    }

    return superUglyList[n - 1];
  }

  /**
   * @desc 计算指定正整数的质因数
   *
   * @param {Number} n 要查找的正整数
   *
   * @returns {Array} 质因数列表
   */
  static getPrimes(n) {

    // 参数判断
    if (typeof n !== "number") {
      throw TypeError('please transfer a number, thanks!');
    }

    let arr = [];

    for (let i = 2, len = n / 2 + 1; i < len; i++) {

      n % i === 0 &&
      !arr.includes(i) &&
      Ugly.getPrimes(i).length === 0 &&
      arr.push(i);

    }

    return arr;
  }
}

export default (n, primes) => {

  return new Ugly(n, primes).getSuperUgly(n);

}