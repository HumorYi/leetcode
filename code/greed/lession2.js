/*
  860. 柠檬水找零

  在柠檬水摊上，每一杯柠檬水的售价为 5 美元。

  顾客排队购买你的产品，（按账单 bills 支付的顺序）一次购买一杯。

  每位顾客只买一杯柠檬水，然后向你付 5 美元、10 美元或 20 美元。你必须给每个顾客正确找零，也就是说净交易是每位顾客向你支付 5 美元。

  注意，一开始你手头没有任何零钱。

  如果你能给每位顾客正确找零，返回 true ，否则返回 false 。

  示例 1：
    输入：[5,5,5,10,20]
    输出：true
    解释：
      前 3 位顾客那里，我们按顺序收取 3 张 5 美元的钞票。
      第 4 位顾客那里，我们收取一张 10 美元的钞票，并返还 5 美元。
      第 5 位顾客那里，我们找还一张 10 美元的钞票和一张 5 美元的钞票。
      由于所有客户都得到了正确的找零，所以我们输出 true。

  示例 2：
    输入：[5,5,10]
    输出：true

  示例 3：
    输入：[10,10]
    输出：false

  示例 4：
    输入：[5,5,10,10,20]
    输出：false
    解释：
    前 2 位顾客那里，我们按顺序收取 2 张 5 美元的钞票。
    对于接下来的 2 位顾客，我们收取一张 10 美元的钞票，然后返还 5 美元。
    对于最后一位顾客，我们无法退回 15 美元，因为我们现在只有两张 10 美元的钞票。
    由于不是每位顾客都得到了正确的找零，所以答案是 false。
   

  提示：
    0 <= bills.length <= 10000
    bills[i] 不是 5 就是 10 或是 20 
*/

/*
  解题思路：
    0、参数判断：
    1、贪心算法：问题：找零钱
      这是一种思想，寻找局部最优解，通过每一步得到的最优解来寻找全局最优解

    2、策略：
      1、给钱找零，不区分金额直到找到足够的零钱（单次找零，小孩子）
      2、给钱找零，优先给金额大的零钱，尽量把小的零钱放在手里（多次找零，大人）
*/

export default (bills) => {

  // 参数判断
  if (!Array.isArray(bills)) {
    throw TypeError('please transfer a array, thanks!');
  }
  if (0 < bills.length || bills.length > 10000) {
    throw TypeError('please transfer a array length between 0 and 10000, thanks!');
  }
  bills.forEach((bill, index) => {
    if (!/^(5|10|20)$/.test(bill)) {
      throw TypeError(`第 ${index} 位置数据：${bill} 不是 5/10/20`);
    }
  });

  let prices = [...bills],
      cashbox = [],
      lemonadePrice = 5
  ;

  while (prices.length > 0) {

    let pay = prices.shift();

    if (pay === lemonadePrice) {
      cashbox.push(pay);
    }
    else {

      cashbox.sort((a, b) => b - a);

      let change = pay - lemonadePrice;

      for (let i = 0, len = cashbox.length; i < len; i++) {

        if (cashbox[i] <= change) {
          change -= cashbox.splice(i--, 1);
        }

        if (change === 0) {
          break;
        }

      }

      if (change !== 0) {
        return false;
      }

      cashbox.push(pay);
    }

  }

  return true;

}
