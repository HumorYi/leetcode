/*
  605. 种花问题

  假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。

  给定一个花坛（表示为一个数组包含0和1，其中0表示没种植花，1表示种植了花），和一个数 n 。能否在不打破种植规则的情况下种入 n 朵花？能则返回True，不能则返回False。

  示例 1:
    输入: flowerbed = [1,0,0,0,1], n = 1
    输出: True

  示例 2:
    输入: flowerbed = [1,0,0,0,1], n = 2
    输出: False

  注意:
    数组内已种好的花不会违反种植规则。
    输入的数组长度范围为 [1, 20000]。
    n 是非负整数，且不会超过输入数组的大小。
*/

/*
  解题思路：
    0、参数判断：花坛是一个只能为0/1的数字数组，种植花的数量是一个正整数
    1、先判断花坛中是否有地可以种植，如果否，直接返回false
    2、可以在花坛种植花的地方有：头部、中间、尾部
    头跟尾只要有2个0连续就可以种1朵花 => Math.floor(num(0) / 2)
    中间必须得三个以上才能种1朵花 => Math.floor((num(0)-1) / 2)
*/

functin getFlowerbedCount(zeroLen) {
  return Math.floor(zeroLen / 2);
}

export default (arr, n) => {
  // 参数判断

  // 花坛类型判断
  if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') {
    throw TypeError("flowerbed muse be a array");
  }

  let flowerbed = [...arr];
  let flowerbedLen = flowerbed.length;
  let strFlowerbed = flowerbed.join('');

  // 花坛长度区间判断
  if (flowerbedLen < 1 || flowerbedLen > 20000) {
    throw TypeError("flowerbed length must between 1 and 20000");
  }

  // 花坛元素判断
  if (/[^0|1]/.test(strFlowerbed)) {
    throw TypeError('flowerbed item must be a 0 or 1');
  }

  // 种花个数类型、大小范围等判断
  if (typeof n !== 'number' ||
    n !== n ||
    n !== Math.abs(n) ||
    n !== Math.floor(n) ||
    n > flowerbedLen
  ) {
    throw TypeError('n must be a integer');
  }

  // 记录可以种植的个数
  let flowerbedCount = 0;

  // 方式二（适合获取和替换内容）：数组找规律
  for(let i=0; i<flowerbedLen; i++) {
    if (arr[i] !== 0) { continue; }

    // 边界判断
    if (i === 0 && arr[1] === 0 || // 第一项
      arr[i-1] === 0 && arr[i+1] === 0 || // 中间项
      i === flowerbedLen-1 && arr[i-2] === 1 && arr[i-1] === 0 // 最后一项
    ) {
      // 如果要范湖组装好的花坛数组，则解开注释
      // flowerbed[i] = 1;
      flowerbedCount++
      i++;
    }
  }

  // 方式一（直接获取匹配的内容，适合获取，不适合替换内容）：字符串拆分
  // let startIndex = strFlowerbed.indexOf(1);
  // let endIndex = strFlowerbed.lastIndexOf(1);

  // // 判断花坛头部是否可以种植
  // if (flowerbed[0] === 0) {
  //   // 获取花坛头部空地个数
  //   flowerbedCount += getFlowerbedCount(startIndex);
  // }
  // // 判断花坛中间是否可以种植
  // let canFlowerbed = strFlowerbed.substring(startIndex + 1, endIndex).match(/0{3,}/g);
  // if (canFlowerbed) {
  //   canFlowerbed.forEach((item, i) => {
  //     flowerbedCount += getFlowerbedCount(item.length-1);
  //   });
  // }
  // // 判断花坛尾部是否可以种植
  // if (flowerbed[flowerbedLen - 1] === 0) {
  //   flowerbedCount += getFlowerbedCount(flowerbedLen - endIndex - 1);
  // }

  return flowerbedCount >= n;
}