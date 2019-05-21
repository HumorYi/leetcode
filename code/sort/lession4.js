/*
  922. 按奇偶排序数组 II

  给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。

  对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。

  你可以返回任何满足上述条件的数组作为答案。

  示例：
    输入：[4,2,5,7]
    输出：[4,5,2,7]
    解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。

    提示：
      2 <= A.length <= 20000
      A.length % 2 == 0
      0 <= A[i] <= 1000
*/

/*
  解题思路：
    0、参数判断：
    1、数组长度为偶数
    2、数组内奇偶数各占一半

    // 方式一：
      3、遍历数组，把奇数存在奇数数组中，把偶数存在偶数数组中
      4、创建一个新数组，遍历偶数数组，先添加一个偶数，再添加一个奇数

    // 方式二：
      3、使用光标来进行填充奇偶数
      4、创建一个新数组，创建一个偶数光标值为0，创建一个奇数光标值为1，
        当前数如果是偶数，在新数组的偶数光标处添加当前元素，偶数光标+2；
        当前数如果是奇数，在新数组的奇数光标处添加当前元素，奇数光标+2；

    5、返回新数组
*/

export default (arr) => {
  // 参数判断
  if (Object.prototype.toString.call(arr).slice(8, -1) !== 'Array') {
    throw TypeError("please transfer a array, thanks!");
  }

  let arrLen = arr.length;
  if (arrLen < 2 || arrLen > 20000) {
    throw TypeError("please transfer a array length between 2 and 20000, thanks!");
  }

  if (arrLen % 2 !== 0) {
    throw TypeError("please transfer a array length is even, thanks!");
  }

  if (/[^\d](-\d)|1000|\d{4,}/.test(arr.join())) {
    throw TypeError("please transfer a array item between 0 and 1000, thanks!");
  }

  let odevityArr = [];

  // 方式二：奇偶光标
  let evenIndex = 0;
  let oddIndex = 1;

  for (let i = 0; i < arrLen; i++) {
    let item = arr[i];
    if (item % 2 === 0) {
      odevityArr[evenIndex] = item;
      evenIndex += 2;
      continue;
    }

    odevityArr[oddIndex] = item;
    oddIndex += 2;
  }

  if (arrLen !== odevityArr.length) { throw TypeError("please transfer a array includes half even and half odd, thanks!") }


  /* 方式一：奇偶数组
  let evenArr= [];
  let oddArr =[];

  for (let i=0; i<arrLen; i++) {
    let item = arr[i];
    item % 2 === 0 ? evenArr.push(item) : oddArr.push(item);
  }

  let evenArrLen = evenArr.length
  if (evenArrLen !== oddArr.length) { throw TypeError("please transfer a array includes half even and half odd, thanks!") }

  for (let i=0; i<evenArrLen; i++) {
    odevityArr.push(evenArr[i], oddArr[i]);
  } */

  return odevityArr;
}