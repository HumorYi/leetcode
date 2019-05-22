/*
  93. 复原IP地址

  给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

  示例:
    输入: "25525511135"
    输出: ["255.255.11.135", "255.255.111.35"]
*/

/*
  解题思路：
    0、参数判断：
    1、IP匹配成功规则：数字内容范围为 4~12、每位长度不能超过3、每位数字内容范围为 0~255、每位数字内容不能以0开头，*1转为有效数字
    2、遍历子串，获取当前位数字内容，满足条件则继续拿当前内容和子串进行递归，得到符合条件的IP
    3、查找规律，计算递归边界条件, 中间数组代表位数，左右两边代表子串大小范围
      3 <= 1 <= 9
      2 <= 2 <= 6
      1 <= 3 <= 3
      0 <= 4 <= 0
    4、根据上述分析，得出每位子串输入访问规律为：3-currLen <= bit <= (3-currLen) * 3
    5、当找到匹配的IP时，存储到内容数组中，继续下一轮递归匹配IP
*/

let search = (cur, sub, result = []) => {
  let curLen = cur.length;
  // 边界条件，IP组装成功
  if (curLen === 4) { result.push(cur.join('.')); }
  else {
    let i = 0;
    let subLen = sub.length;
    // IP中每一位数字不能超过3个
    let len = Math.min(3, subLen);
    let tmp;
    let nextSubLen;
    for (; i < len; i++) {
      // 通过判断下一个子串的长度来过滤掉长度不符合的当前子串，提升性能
      nextSubLen = subLen - i - 1;
      if (nextSubLen < 3 - curLen ||  nextSubLen > (3 - curLen) * 3) { continue; }

      // 选取当前位数字
      tmp = sub.substr(0, i + 1);

      // 当前位只能在0~255之间
      if (tmp > 255) { continue; }

      // 递归当前位和剩余子串
      search(cur.concat([tmp * 1]), sub.substr(i + 1), result);
    }

    // 范湖组装好的IP地址
    return result;
  }
}

export default str => {
  // 参数判断
  if (typeof str !== 'string' ||
    !str || /[^\d]/.test(str) ||
    str.length < 4 || str.length > 12
  ) {
    throw TypeError('please transfer a number string between 4 and 12, thanks!');
  }

  return search([], str);
}