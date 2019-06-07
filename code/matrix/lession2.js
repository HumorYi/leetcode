/*
  48. 旋转图像

  给定一个 n × n 的二维矩阵表示一个图像。

  将图像顺时针旋转 90 度。

  说明：
    你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

  示例 1:
    给定 matrix =
      [
        [1,2,3],
        [4,5,6],
        [7,8,9]
      ],

    原地旋转输入矩阵，使其变为:
      [
        [7,4,1],
        [8,5,2],
        [9,6,3]
      ]

  示例 2:
    给定 matrix =
      [
        [ 5, 1, 9,11],
        [ 2, 4, 8,10],
        [13, 3, 6, 7],
        [15,14,12,16]
      ],

    原地旋转输入矩阵，使其变为:
      [
        [15,13, 2, 5],
        [14, 3, 4, 1],
        [12, 6, 8, 9],
        [16, 7,10,11]
      ]
*/

/*
  解题思路：
    0、参数判断：
    1、要旋转，就必须要有中心轴，根据题意可知，顺时针旋转90度，
      很明显中心轴是x，以中间为分割线，上下翻转，
      这时左上角和右下角就已确定好了，已两角为基点，做对角线，
      对象线的两边对称互换，即得到顺时针旋转90度的新矩阵
*/

export default (matrix) => {

  // 参数判断
  if (!Array.isArray(matrix)) {

    throw TypeError('please transfer a array, thanks!');

  }

  // 获取二维数组的维度
  let vecor = matrix.length;

  // 以中间行为中心轴，垂直（上下）翻转
  for (let i = 0, len = vecor / 2; i < len; i++) {

    for (let j = 0, tmp; j < vecor; j++) {

      tmp = matrix[i][j];
      matrix[i][j] = matrix[vecor - 1 - i][j];
      matrix[vecor - 1 - i][j] = tmp;

    }

  }

  // 对角线翻转
  for (let i = 0; i < vecor; i++) {

    for (let j = 0, tmp; j < i; j++) {

      tmp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = tmp;

    }

  }

  return matrix;
}