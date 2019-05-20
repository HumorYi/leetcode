/*
  10. 正则表达式匹配

  给定一个字符串 (s) 和一个字符模式 (p)。实现支持 '.' 和 '*' 的正则表达式匹配。

  '.' 匹配任意单个字符。
  '*' 匹配零个或多个前面的元素。
  匹配应该覆盖整个字符串 (s) ，而不是部分字符串。

  说明:
    s 可能为空，且只包含从 a-z 的小写字母。
    p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。

  示例 1:
    输入:
      s = "aa"
      p = "a"
    输出: false
    解释: "a" 无法匹配 "aa" 整个字符串。

  示例 2:
    输入:
      s = "aa"
      p = "a*"
    输出: true
    解释: '*' 代表可匹配零个或多个前面的元素, 即可以匹配 'a' 。因此, 重复 'a' 一次, 字符串可变为 "aa"。

  示例 3:
    输入:
      s = "ab"
      p = ".*"
    输出: true
    解释: ".*" 表示可匹配零个或多个('*')任意字符('.')。

  示例 4:
    输入:
      s = "aab"
      p = "c*a*b"
    输出: true
    解释: 'c' 可以不被重复, 'a' 可以被重复一次。因此可以匹配字符串 "aab"。

  示例 5:
    输入:
      s = "mississippi"
      p = "mis*is*p*."
    输出: false
*/

/*
  解题思路：
    0、参数判断
    1、模式只能匹配a-z\.\*，可以细分为 [a-z]*, .*, ., a-z
    2、. 碰到任意字符都匹配成功，.*表示后面无论是任何字符都匹配成功，
      a*表示匹配单个字符0~无限次，a-z表示匹配每一个都完全符合的字符
    3、设置模式匹配光标，遍历字符串，通过光标来控制与字符串匹配的位置
    4、当光标与字符串长度相等时匹配成功，否则匹配失败
*/

export default (str, mode) => {
  if (typeof str !== "string" || str && /[^a-z]/.test(str)) {
    throw TypeError('please transfer a a-z string, thanks!');
  }
  if (typeof mode !== "string" || mode && /[^a-z\.\*]/.test(mode)) {
    throw TypeError('please transfer a a-z string, thanks!');
  }

  // 对模式参数进行正则筛选，a* | .*(模式匹配), .(任意字符), cdef(指定字符)
  let modeArr = mode.match(/([a-z\.]\*)|(\.)|([a-z]+(?=([a-z\.]\*)|$))/g);

  if (!modeArr) { throw TypeError('mode match failed'); }
  // 设置关闭初始位置
  let cursor = 0;
  // 获取字符串长度
  let strLen = str.length;
  // 遍历字符串
  for(let i=0, len=modeArr.length; i<len; i++) {
    // 对于模式分为三类：.* | a* | . | cdef
    let currMode=modeArr[i];

    // 匹配 . , 任意字符碰到 . 都匹配成功，光标往后移，跳过后续操作
    if (currMode.length === 1 && currMode[0] === ".") { cursor++; continue; }

    // 匹配 .* | a* ，如果第二位是 *，表示是有模式的
    if (currMode[1] === "*") {
      // 如果第一位是 . ，则表明匹配成功，把光标移到字符串结尾
      if (currMode[0] === ".") { return true; }

      // 否则第一位是字母，与字符串中当前字母匹配，如果成功，光标继续往后移
      while(str[cursor] === currMode[0]) { cursor++ }

      continue;
    }

    // 匹配 cdef，无模式匹配，要求当前字符与字符串中的对应位字符相等
    for(let j=0, currModeLen=currMode.length; j<currModeLen; j++) {
      // 如果对应位字符不相等，匹配失败
      if (currMode[j] !== str[cursor]) { return false; }

      cursor++;
    }
  }

  // 如果光标与字符串长度相等，表示匹配成功，否则匹配失败
  return cursor === strLen;
}