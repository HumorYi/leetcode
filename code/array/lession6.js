/**
  79. 单词搜索

  给定一个二维网格和一个单词，找出该单词是否存在于网格中。

  单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

  示例:
    board =
    [
      ['A','B','C','E'],
      ['S','F','C','S'],
      ['A','D','E','E']
    ]

    给定 word = "ABCCED", 返回 true
    给定 word = "SEE", 返回 true
    给定 word = "ABCB", 返回 false
   
  提示：
    board 和 word 中只包含大写和小写英文字母。
    1 <= board.length <= 200
    1 <= board[i].length <= 200
    1 <= word.length <= 10^3
*/

/**
 * 解题思路：
 *  递归 + 回溯（找一个起点，尝试下一步，看结果，不合适再返回到上一步，走别的路）
 *  公式：
 *    1、找起点
 *    2、做标记
 *    3、递归
 *    4、撤回标记
 *
 *  1、（找规律）这是一个二维矩阵（数组），第二维都是相同长度的数组
 *  2、外内二层遍历二维矩阵（行、列），外层（行）：矩阵长度，内层（列）：第二维数组长度 board[0].length
 *  3、以第二维第一个元素为起点，下标 0
 *  4、如果当前元素 与 单词下标值 对应，则证明匹配成功，将当前值置空（做标记），避免递归再次查找
 *  5、递归 前后左右 开始查找
 *  6、还原当前元素值（撤回标记），后续递归查找时还需要匹配
 *  7、注意：为了避免递归进入死循环，递归一定要有结束条件
 *    结束条件：
 *      失败情况：行、列下标超出匹配范围、当前元素 与 单词下标值匹配失败
 *      成功情况：起点到达终点时还匹配成功，从单词第0个字符开始匹配到最后一个字符
 *
 *  时间复杂度O(n^2)
 *  空间复杂度O(1)
 */
export default function exist(board, word) {
  const rowLen = board.length
  const wordLen = word.length

  if (rowLen === 0 || wordLen === 0) {
    return false
  }

  const colLen = board[0].length

  // 递归 + 回溯 公式

  const find = (rowIndex, colIndex, wordIndex = 0) => {
    // 递归一定要有终止判断条件
    if (rowIndex >= rowLen || rowIndex < 0) {
      return false
    }

    if (colIndex >= colLen || colIndex < 0) {
      return false
    }

    const letter = board[rowIndex][colIndex]

    // 字符不匹配
    if (letter !== word[wordIndex]) {
      return false
    }

    // 找到最后一个字符匹配，代表匹配成功
    if (wordIndex === wordLen - 1) {
      return true
    }

    // 2、做标记，将当前字符置空，避免递归时再次查找
    board[rowIndex][colIndex] = ''

    // 3、递归，进行下一步查找，这道题要查找这个字母的上下左右四个位置
    const nextWordIndex = wordIndex + 1
    const ret =
      find(rowIndex + 1, colIndex, nextWordIndex) ||
      find(rowIndex - 1, colIndex, nextWordIndex) ||
      find(rowIndex, colIndex + 1, nextWordIndex) ||
      find(rowIndex, colIndex - 1, nextWordIndex)

    // 4、撤回标记，还原当前元素值，后续递归查找时还需要匹配
    board[rowIndex][colIndex] = letter

    return ret
  }

  // 1、找起点
  for (let rowIndex = 0; rowIndex < rowLen; rowIndex++) {
    for (let colIndex = 0; colIndex < colLen; colIndex++) {
      if (find(rowIndex, colIndex)) {
        return true
      }
    }
  }

  return false
}
