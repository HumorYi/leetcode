/*
  54. 螺旋矩阵

  给定一个包含 m x n 个元素的矩阵（m 行, n 列），请按照顺时针螺旋顺序，返回矩阵中的所有元素。

  示例 1:
    输入:
    [
      [ 1, 2, 3 ],
      [ 4, 5, 6 ],
      [ 7, 8, 9 ]
    ]
    输出: [1,2,3,6,9,8,7,4,5]

  示例 2:
    输入:
    [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9,10,11,12]
    ]
    输出: [1,2,3,4,8,12,11,10,9,5,6,7]
*/

/*
  解题思路：
    0、参数判断：
    1、根据题意可知，这是一个明显的递归处理方式，
      遍历矩阵，第一行顺序添加，中间的每一行取最后一个并删掉，最后一行倒序添加；
      把第一行和最后一行删掉，
      再倒序遍历矩阵（中间的每一行），每一行取第一个并删掉，
      如此递归，即可得到最终的螺旋矩阵
*/

// 处理每一圈的数据遍历过程
let getSpiralMatrix = (matrix, result = []) => {

  for (let i = 0, matrixLen = matrix.length; i < matrixLen; i++) {

    switch (i) {

      case 0:

        result = result.concat(matrix[i]);
        break;

      case matrixLen - 1:

        result = result.concat(matrix[i].reverse());

        break;

      default:

        result.push(matrix[i].pop());

        break;

    }

  }

  matrix.shift();
  matrix.pop();

  for (let i = matrix.length - 1; i > 0; i--) {
    result.push(matrix[i].shift());
  }

  return matrix.length > 0 ? getSpiralMatrix(matrix, result) : result;

}

export default (matrix) => {

  // 参数判断
  if (!Array.isArray(matrix)) {

    throw TypeError('please transfer a array, thanks!');

  }


  return getSpiralMatrix(matrix);

}