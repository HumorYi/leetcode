/*
  914. 卡牌分组

  给定一副牌，每张牌上都写着一个整数。

  此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：

  每组都有 X 张牌。
  组内所有的牌上都写着相同的整数。
  仅当你可选的 X >= 2 时返回 true。

  示例 1：
    输入：[1,2,3,4,4,3,2,1]
    输出：true
    解释：可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]

  示例 2：
    输入：[1,1,1,2,2,2,3,3]
    输出：false
    解释：没有满足要求的分组。

  示例 3：
    输入：[1]
    输出：false
    解释：没有满足要求的分组。

  示例 4：
    输入：[1,1]
    输出：true
    解释：可行的分组是 [1,1]

  示例 5：
    输入：[1,1,2,2,2,2]
    输出：true
    解释：可行的分组是 [1,1]，[2,2]，[2,2]

  提示：
    1 <= deck.length <= 10000
    0 <= deck[i] < 10000
*/

export default arr => {
  // 参数验证
  if (/[^\d]/.test(arr.join(""))) { throw TypeError("please transfer a number array, thanks!"); }

  // 最终最小长度，用户寻找数组中最小项
  let min = 2;
  // 元素最小长度
  let originMin = 2;
  let arrLen = arr.length;
  let tmp = [];
  let decks = [];

  // 优先判断能通过少数条件匹配的结果
  if (arrLen < originMin) { return false; }
  if (arrLen === originMin) { return arr[0] === arr[1]; }


  // 先进行排序，把相同数字都排列在一起;
  arr.sort((a, b) => a - b);

  // 再遍历找出相同的数字个数组成新项添加到扑克牌数组中
  for (let i = 0; i < arrLen;) {
    // 获取当前项
    let item = arr[i];
    // 获取当前项的总长度，找到的个数 = 下标差 + 1
    let itemLen = arr.lastIndexOf(item) - arr.indexOf(item) + 1;

    // 只找到一个，表明匹配失败
    if (itemLen < originMin) { return false; }

    // 更新最小项个数
    if (itemLen < min) { min = itemLen; }

    // 把当前项添加到临时数组中
    tmp.push(new Array(itemLen).fill(item));

    // 改变下标，直接遍历下一项
    i += itemLen;
  }

  // 遍历扑克牌数组
  for (let i = 0, tmpLen = tmp.length; i < tmpLen; i++) {
    // 获取当前项个数
    let itemLen = tmp[i].length;

    // 如果当前项个数不是最小项的倍数，则匹配失败
    if (itemLen % min !== 0) { return false; }

    // 获取当前项数字
    let itemNumber = tmp[i][0];
    // 获取当前项是最小项的倍数
    let times = itemLen / min;

    // 根据最小倍数来重新组装最终的扑克牌
    for (let j=0; j<times; j++) {
      decks.push(new Array(min).fill(itemNumber));
    }
  }

  // 当最终的扑克牌长度大于0时证明匹配成功，否则匹配失败
  return decks.length > 0;
}