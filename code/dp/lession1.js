/*
  63. 不同路径 II

  一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

  机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

  现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

  网格中的障碍物和空位置分别用 1 和 0 来表示。

  说明：m 和 n 的值均不超过 100。

  示例 1:
    输入:
      [
        [0,0,0],
        [0,1,0],
        [0,0,0]
      ]
    输出: 2
    解释:
      3x3 网格的正中间有一个障碍物。
      从左上角到右下角一共有 2 条不同的路径：
      1. 向右 -> 向右 -> 向下 -> 向下
      2. 向下 -> 向下 -> 向右 -> 向右
*/

/*
  解题思路：
    0、参数判断：
    1、初看题意很复杂，规律不明显，无从下手，可以尝试使用动态规划思想
    2、动态规划包括三个重要概念：状态转移方程、最优子结构、边界
    3、根据输入、输出，把问题从后向前拆分，先算走后一步有多少种情况，
      再算抵达最后一步有多少种情况，如此拆分推演，可以看出这是一个递归的过程，
      找到规律，得到最优子结构，从而构建状态转移方程，判断递归边界条件。
*/

let obstacles = 1;

/**
 * @desc 动态规划路线
 *
 * @param {Array} arr 网格数据
 * @param {Number} row 行
 * @param {Number} col 列
 *
 * @returns {Number} 查找到的所有路线
 */
let dp = (arr, row, col) => {

  /**
   * 边界判断:
   *  1、0行或0列：走不通，走法为 0
   *  2、单行或单列：如果有障碍物，走不通，走法为 0，否则走法为 1
   *  3、两行两列：
   *    1、右下角有障碍物 或者 右边和下边有障碍物 => 走不通，走法为 0
   *    2、右边 或 下边有障碍物 => 走得通，走法为 1
   *    3、剩余的就是没有障碍物，走法为 2
   * */
  if (row === 0 || col === 0) {
    return 0;
  }
  else if (row === 1) { // 单行
    return arr[row - 1].includes(obstacles) ? 0 : 1;
  }
  else if (col === 1) { // 单列

    for (let i = 0; i < row; i++) {

      if (arr[i][0] === obstacles) {
        return 0;
      }

    }

    return 1;
  }
  else if (row === 2 && col === 2) {

    let right = arr[1][0],
        down = arr[0][1],
        rightDown = arr[1][1]
    ;

    return (rightDown === obstacles || (right === obstacles && down === obstacles)) ? 0 : (right === obstacles || down === obstacles) ? 1 : 2;
  }
  else {
    return dp(arr, row - 1, col) + dp(arr, row, col - 1);
  }

};

export default (arr) => {

  // 参数判断
  if (!Array.isArray(arr)) {
    throw TypeError('please transfer a array, thanks!');
  }

  if (arr.length === 0) {
    return 0;
  }
  else {
    arr.forEach((itemArr, itemArrIndex) => {
      if (!Array.isArray(itemArr)) {
        throw TypeError(`第 ${itemArrIndex} 位置数据: ${itemArr} 必须是数组`);
      }

      itemArr.forEach((item, index) => {
        if (!(item === 0 || item === 1)) {
          throw RangeError(`第 ${itemArrIndex} 位置数据: ${itemArr} 下面的  ${index} 位置数据: ${item} 必须是0或1`);
        }
      });
    });
  }

  return dp(arr, arr.length, arr[0].length);

}