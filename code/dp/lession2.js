/*
  787. K 站中转内最便宜的航班

  有 n 个城市通过 m 个航班连接。每个航班都从城市 u 开始，以价格 w 抵达 v。

  现在给定所有的城市和航班，以及出发城市 src 和目的地 dst，你的任务是找到从 src 到 dst 最多经过 k 站中转的最便宜的价格。 如果没有这样的路线，则输出 -1。

  示例 1:
    输入:
      n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
      src = 0, dst = 2, k = 1
    输出: 200
    解释:
      城市航班图如下
            0
      100 /   \ 500
        /       \
      1----100---2

    从城市 0 到城市 2 在 1 站中转以内的最便宜价格是 200，如图中红色所示。

  示例 2:
    输入:
      n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
      src = 0, dst = 2, k = 0
    输出: 500
    解释:
      城市航班图如下
              0
        100 /   \ 500
          /       \
        1----100---2

      从城市 0 到城市 2 在 0 站中转以内的最便宜价格是 500，如图中蓝色所示。

  提示：
    n 范围是 [1, 100]，城市标签从 0 到 n - 1.
    航班数量范围是 [0, n * (n - 1) / 2].
    每个航班的格式 (src, dst, price).
    每个航班的价格范围是 [1, 10000].
    k 范围是 [0, n - 1].
    航班没有重复，且不存在环路
*/

/*
  解题思路：
    0、参数判断：
    1、使用动态规划思想，拆分问题，先算抵达目的地的最后一站，再以此站位目的地，
      如此反复往前查找能够抵达目的地的航班路线，
      得到所有的路线之后，再比较路线经费，座最便宜的路线经费航班
*/

/**
 * @desc K 站中转内最便宜的航班
 *
 * @param {Array} fights 航班
 * @param {Number} src 起始城市
 * @param {Number} dst 目的城市
 * @param {Number} k 中转站次数
 *
 * @returns {Number} 最便宜航班价钱
 */
let cheap = (fights, src, dst, k) => {

  // 从抵达目的城市的上一个城市往前查找满足路线的城市，再取最便宜的航班路线
  let min = Math.min.apply(null, fights.filter(item => item[1] === dst).map(item => {

    // 从dst往前找，找到了起始城市，并且中转的次数小于k
    if (item[0] === src && k > -1) {
      return item[2];
    }
    // 到达中转次数k，起始站不是要查找的起始城市，没找到，把值设的无限大，相当于被移除
    else if (k === 0 && item[0] !== src) {
      return Number.MAX_SAFE_INTEGER;
    }

    // 以当前城市为目的地，递归往前找
    return item[2] + cheap(fights, src, item[0], k - 1);
  }));

  // 增加返回值是不是Number.MAX_SAFE_INTEGER，如果是返回-1
  return min >= Number.MAX_SAFE_INTEGER ? -1 : min;
};

export default (n, fights, src, dst, k) => {

  // 参数判断
  if (!Number.isInteger(n) || n < 1 || n > 100) {
    throw TypeError('please transfer a number n between 1 to 100');
  }
  if (!Array.isArray(fights) || fights.length < 0 || fights.length > n * (n - 1) / 2) {
    throw TypeError(`please transfer a array fights length between 0 and ${n * (n - 1) / 2}, thanks!`);
  }
  if (!Number.isInteger(k) || n < 0 || k > n - 1) {
    throw TypeError(`please transfer a number k between 0 to ${n-1}`);
  }

  fights.forEach((fight, index) => {

    if (!Array.isArray(fight) || fight.length !== 3) {
      throw TypeError(`please transfer a array fight length is 3 on ${index} data is ${fight}, thanks!`);
    }

    let price = fight[2];

    if (!Number.isInteger(price) || price < 1 || price > 10000) {
      throw TypeError(`please transfer a number price between 1 to 10000 on ${index} data is ${price}`);
    }

  });


  return cheap(fights, src, dst, k);

}