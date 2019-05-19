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

/*
  notice: 如果只是单纯想获取是否可以分组，不需要获取分组内容，会更简单一些

  解题思路1(数组)：
    0、参数判断：只能输入内容为数字的数组
    1、如果数组长度小于最小分组数，则分组失败，返回false
    2、如果数组长度等于最小分组数，分组结果为 第一个元素与第二个元素 是否相等
    3、先进行升序排序，把相同数字都排列在一起;
    4、创建一个临时数组，存储个数大于最小分组数的数字组成的数组元素
    5、循环遍历数组，获取当前数字出现的个数，
      如果当前数字出现的个数小于最小分组数，则分组失败，返回false；
      创建一个长度为当前数字出现的个数的临时数组，并将数组内部元素初始化为当前数字；
      把该数组存储到临时数组中；
    6、获取临时数组中所有数字个数的最小分组数 => 最大公约数，如果最小分组数小于原始的最小分组数，则分组失败，否则分组成功
    7、创建一个扑克牌数组存储分组成功的元素
    8、循环遍历临时数组，循环遍历倍数，
        创建一个长度为最小分组数的临时数组，并将数组内部元素初始化为当前数字；
        把该数组存储到扑克牌数组中；
    9、匹配成功

  解题思路2(对象，推荐)：
    0、参数判断：只能输入内容为数字的数组
    1、如果数组长度小于最小分组数，则分组失败，返回false
    2、如果数组长度等于最小分组数，分组结果为 第一个元素与第二个元素 是否相等
    3、创建一个临时对象，存储每个数字的个数
    4、循环遍历数组，更新临时对象中每个数字出现的个数
    5、获取临时数组中所有数字个数的最小分组数 => 最大公约数，如果最小分组数小于原始的最小分组数，则分组失败，否则分组成功
    7、创建一个扑克牌数组存储分组成功的元素
    8、循环遍历临时数组，循环遍历倍数，
        创建一个长度为最小分组数的临时数组，并将数组内部元素初始化为当前数字；
        把该数组存储到扑克牌数组中；
    9、匹配成功
*/

function gcdForTwo(num1, num2) {
  var temp; // 使用临时变量来存储交换数值
  // 保证num2最小
  if (num1 < num2) {
    temp = num2;
    num2 = num1;
    num1 = temp;
  }

  // 当num2的值不为0时，循环查询
  while (num2 !== 0) {
    temp = num2;
    num2 = num1 % num2;
    num1 = temp;
  }

  return num1;
}

function gcdForArray(arr) {
  let cloneArr = [...arr];

  while(cloneArr.length > 1) {
    let first = cloneArr.shift();
    let second = cloneArr.shift();
    let val = gcdForTwo(first, second);
    if (val === 1) { return val; }
    cloneArr.unshift(val);
  }

  return cloneArr[0];
}

// 方式二(优化版)：对象
function isGroup(arr) {

  // 参数验证
  if (/[^\d]/.test(arr.join(""))) { throw TypeError("please transfer a number array, thanks!"); }

  // 最小分组数 => 最大公约数
  let gcd = 1;
  // 元素最小长度
  let originMin = 2;
  let arrLen = arr.length;
  let tmp = {};

  // 优先判断能通过少数条件匹配的结果
  if (arrLen < originMin) { return false; }
  if (arrLen === originMin) { return arr[0] === arr[1]; }

  // 循环遍历获取每个个数出现的个数，存储在临时对象中
  arr.forEach(item => {
    tmp[item] = tmp[item] ? tmp[item] + 1 : 1;
  });

  // 获取最小分组数
  gcd = gcdForArray(Object.values(tmp));
  // 如果最小分组数 < 定义的最小分组数，分组失败
  if (gcd < originMin) { return false; }

  // 如果无需获取分组数组，可把这块注释掉
  let decks = [];
  // 遍历临时对象
  for (let num in tmp) {
    // 根据最小倍数来重新组装最终的扑克牌
    for (let j = tmp[num] / gcd; j > 0; j--) {
      decks.push(new Array(gcd).fill(num));
    }
  }

  return true;
}

// 方式一：数组
export default arr => {
  return isGroup(arr);

  // 参数验证
  if (/[^\d]/.test(arr.join(""))) { throw TypeError("please transfer a number array, thanks!"); }

  // 最小分组数 => 最大公约数
  let gcd = 2;
  // 元素最小长度
  let originMin = 2;
  let arrLen = arr.length;
  let tmp = [];
  let decks = [];

  // 优先判断能通过少数条件匹配的结果
  if (arrLen < originMin) { return false; }
  if (arrLen === originMin) { return arr[0] === arr[1]; }

  // 先进行升序排序，把相同数字都排列在一起;
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
    if (itemLen < gcd) { gcd = itemLen; }

    // 把当前项添加到临时数组中
    tmp.push(new Array(itemLen).fill(item));

    // 改变下标，直接遍历下一项
    i += itemLen;
  }

  let groups = [];
  for (let i = 0, tmpLen = tmp.length; i < tmpLen; i++) {
    groups.push(tmp[i].length);
  }
  // 获取最小分组数
  gcd = gcdForArray(Object.values(groups));
  // 如果最小分组数 < 定义的最小分组数，分组失败
  if (gcd < originMin) { return false; }

  // 获取最大公约数

  // 遍历临时数组，判断结果并存在分组
  for (let i = 0, tmpLen = tmp.length; i < tmpLen; i++) {
    // 获取当前项;
    let item = tmp[i];

    // 获取当前项数字
    let itemNumber = item[0];

    // 根据最小倍数来重新组装最终的扑克牌
    for (let j = item.length / gcd; j > 0; j--) {
      decks.push(new Array(gcd).fill(itemNumber));
    }
  }

  // 当走到这里时，表明分组成功，所有的组元素都在decks数组中
  return true;
}