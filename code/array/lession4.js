/*
  89. 格雷编码

  格雷编码是一个二进制数字系统，在该系统中，两个连续的数值仅有一个位数的差异。

  给定一个代表编码总位数的非负整数 n，打印其格雷编码序列。格雷编码序列必须以 0 开头。

  示例 1:
    输入: 0
    输出: [0]
    解释: 我们定义格雷编码序列必须以 0 开头。
        给定编码总位数为 n 的格雷编码序列，其长度为 2n。当 n = 0 时，长度为 20 = 1。
        因此，当 n = 0 时，其格雷编码序列为 [0]。

  示例 2:
    输入: 1
    输出: [0,1]
    解释:
      0 - 0
      1 - 1

  示例 3:
    输入: 2
    输出: [0,1,3,2]
    解释:
      00 - 0
      01 - 1
      11 - 3
      10 - 2

      对于给定的 n，其格雷编码序列并不唯一。
      例如，[0,2,3,1] 也是一个有效的格雷编码序列。

      00 - 0
      10 - 2
      11 - 3
      01 - 1

  示例 4:
    输入: 3
    输出: [0,1,3,2,6,7,5,4]
    解释:
      000 - 0
      001 - 1
      011 - 3
      010 - 2
      110 - 6
      111 - 7
      101 - 5
      100 - 4
*/

/*
  解题思路：
    0、参数判断：非负整数 n
    1、格雷编码输出的长度为 2的输入数字次方
    2、前一个数字的输出是下一个数字输出的前半部分
    3、高位的0和1各占输出的一半，低位以高位0和1之间分割，都是倒叙对称的，
      并且低位的0部分是前一个数的输出，低位的1部分是前一个数的输出倒叙部分
    4、先求出前一个数的格雷编码，再算出当前输出个数的长度，
      当前数高位0和1的输出长度 等于 前一个数的输出长度，遍历前一个数的输出，
      高位0的每一位是顺序拼接 前一个数输出的每一位，
      高位1的每一位是倒序拼接 前一个数输出的每一位， =>
        通过当前数的输出长度可获得最大输出下标，
        最大输出下标 - 前一个数的输出下标 = 高位1与高位0中低位对称的元素
      从而可以得到当前的输出格雷编码
*/

/**
 * @desc 用来获取数字n的输出格雷编码
 *
 * @param {Number} n 获取指定数字的格雷编码
 * @param {*} type default:decimal 获取格雷编码类型：有二进制和十进制(decimal)
 *
 * @returns {Array} 格雷编码
 */
let make = (n, type = "decimal") => {
  // 获取十进制数
  if (n === 0) {
    return type === "decimal" ? [0] : ['0'];
  }
  if (n === 1) {
    return type === "decimal" ? [0, 1] : ['0', '1'];
  }

  // 方式二：循环
  let result = [0, 1];
  if (type !== "decimal") { result = ['0', '1']; }
  // 默认返回结果为n=1时的结果
  for (let i = 2; i <= n; i++) {
    // 只需计算高位为1时的增值，因为高位为0时的值就是上一个数的结果
    let highVal = Math.pow(2, i - 1);
    // 获取当前结果的最大下标
    let currResultMaxIndex = Math.pow(2, i) - 1;
    // 计算上一个结果长度，当前结果长度为上一个结果长度的一倍
    let prevResultLen = result.length;
    // 遍历上一个结果的每个元素，注册到当前结果高位1的对称位
    for (let j = 0; j < prevResultLen; j++) {
      // 增加高位1的结果 = 当前结果与上一个结果的对称位 再加上 高位1的增值
      // 十进制
      if (type === "decimal") {
        result[currResultMaxIndex - j] = result[j] + highVal;
        continue;
      }

      // 二进制
      result[currResultMaxIndex - j] = `1${result[j]}`;
      result[j] = `0${result[j]}`;
    }
  }

  // 方式一：递归
  /* let prev = make(n - 1);
  let prevLen = prev.length;
  let resultMaxIndex = Math.pow(2, n) - 1;
  let result = [...prev];

  // 十进制
  if (type === "decimal") {
    let highVal = Math.pow(2, n-1);
    for (let i = 0; i < prevLen; i++) {
      result[resultMaxIndex - i] = Number(prev[i]) + highVal;
    }
  }
  else {// 二进制
    for (let i = 0; i < prevLen; i++) {
      result[i] = `0${prev[i]}`;
      result[resultMaxIndex - i] = `1${prev[i]}`;
    }
  }
   */

  return result;
}

export default (n, type) => {
  // 参数判断
  if (typeof n !== 'number' || n !== Math.abs(n) || n !== Math.ceil(n)) {
    throw TypeError('n must be a integer');
  }

  return make(n, type);
}