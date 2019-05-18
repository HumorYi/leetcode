/*
  17. 电话号码的字母组合

  给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
  给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

  示例:
    输入："23"
    输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

  说明:
    尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。
*/

let alphabetObj = {
  2: 'abc',
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz',
};

export default str => {
  // 对输入做处理，如果长度小于1或者有除了2-9之外的数字 返回空（LeetCode测试用例）
  if (str.length < 1 || !/^[2-9]+$/.test(str)) return [];

  // 如果只输入一个按键，则把匹配结果拆分成单个字符返回
  if (str.length === 1) { return alphabetObj[str].split(''); }

  // 拆分输入的数字，存储到数组中， 234 => [2, 3, 4]
  let numbers = str.split('');
  // 保存键盘映射后的字母内容， 23 => ['abc', 'def']
  let code = [];
  // 遍历输入的数字，添加对应的字母
  numbers.forEach(item => {
    let alphabet = alphabetObj[item];
    alphabet && code.push(alphabet);
  });

  /**
   * @desc 组合函数
   * @param {Array} alphabets 要遍历的字母数组
   * @returns {Array} 组合好的数组
   * @notice 传入的数组会修改内部数据，
   *            由于使用了递归，所以无法在内部再嵌套一个副本，
   *            如果不想原数据被修改，请传递一份副本进来
   */
  let combination = alphabets => {
    // 使用临时变量来保存前两项组合的结果
    let tmp = [];
    let first = alphabets[0];
    let second = alphabets[1];

    // 外层循环是遍历第一个元素
    for (let i=0, firstLen=first.length; i<firstLen; i++) {
      // 内层循环是遍历第二个元素
      for (let j=0, secondLen=second.length; j<secondLen; j++) {
        tmp.push(`${first[i]}${second[j]}`);
      }
    }

    // 把组合好的结果替换掉数组前两项，用于与后一项再继续拼接
    alphabets.splice(0, 2, tmp);

    // 如果后续还有元素，继续递归组合
    if(alphabets.length > 1) { combination(alphabets); }
    // 返回临时结果 => 递归内部当前项的结果返回
    else { return tmp; }

    // 最终组合的结果全部存储在临时结果中，也就是第一个元素中，直接返回即可
    return alphabets[0];
  }

  // 返回匹配的结果
  return combination(code);
}