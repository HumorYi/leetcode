/*
  696. 计数二进制子串

  给定一个字符串 s，计算具有相同数量0和1的非空(连续)子字符串的数量，并且这些子字符串中的所有0和所有1都是组合在一起的。
  重复出现的子串要计算它们出现的次数。

  示例 1 :
    输入: "00110011"
    输出: 6
    解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。

    请注意，一些重复出现的子串要计算它们出现的次数。
    另外，“00110011”不是有效的子串，因为所有的0（和1）没有组合在一起。

  示例 2 :
    输入: "10101"
    输出: 4
    解释: 有4个子串：“10”，“01”，“10”，“01”，它们具有相同数量的连续1和0。

  注意：
    s.length 在1到50,000之间。
    s 只包含“0”或“1”字符。
*/

function matchSubStr(item, subStr) {
  // 一位连续匹配：如果当前项与子串的第一位不相等，代表匹配成功，则直接把结果返回
  if (item !== subStr[0]) { return item + subStr[0]; }

  // 多位匹配
  // 初始前面项为当前项
  let startStr = item;
  // 后面项为空
  let endStr = "";
  // 是否开启前面项匹配，因为前面项一旦匹配完毕之后就要开始匹配后面项
  let isStart = true;

  // 开始匹配
  for (let i = 0, len = subStr.length; i < len; i++) {
    let currSubStr = subStr[i];

    // 选取前面项操作
    if (isStart) {
      // 当前项 与 子串当前项 一致，则把当前项加到前面项中
      if (item === currSubStr) {
        startStr += currSubStr;

        // 如果前面项的长度比后面项的长度大，则代表匹配失败，直接返回未找到
        if (startStr.length > (len - 1 - i)) { return false; }

        continue;
      }

      // 开始项匹配结束
      isStart = false;
      // 把当前项条件到后面项中
      endStr += currSubStr;

      continue;
    }

    // 选取后面项操作

    // 如果当前项与当前子项一致，则代表匹配失败，直接返回未找到
    if (item === currSubStr) { return false; }

    // 如果当前项与前面项不一致，即把当前项加到后面项中
    endStr += currSubStr;

    // 如果开始项等于后面项，则证明匹配成功，直接把结果返回
    if (startStr.length === endStr.length) { return startStr + endStr; }
  }

  // 其实在循环内已经匹配完毕，这里无需再返回，当加一层保险吧
  return false;
}

export default binaryStr => {
  if (/[^01]/g.test(binaryStr)) { throw TypeError('请输入一个二进制字符串，谢谢合作!') }

  let result = [];
  // 最后一项无需再匹配，因为后面没有匹配项了
  for (let i = 0, endIndex = binaryStr.length-1; i < endIndex; i++) {
    let subStr = matchSubStr(binaryStr[i], binaryStr.slice(i+1));
    subStr && result.push(subStr);
  }

  return result.length;
}