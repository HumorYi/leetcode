/*
  85. 最大矩形

  给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。

  示例:
    输入:
      [
        ["1","0","1","0","0"],
        ["1","0","1","1","1"],
        ["1","1","1","1","1"],
        ["1","0","0","1","0"]
      ]
    输出: 6
*/

/*
  解题思路：
    0、参数判断：二维数组
    1、创建一个矩形三维数组
    2、映射二维数组，再遍历内部的一维数组，创建一个空数组；
      找到连续数值为 "1" 的起始下标和结束下标，存储到数组中，
      再返回空数组
    3、遍历矩形三维数组，把尾部的两个数组移出栈按顺序进行比较，开始位置取最大值，结束位置取最小值，得到最大的列宽
    4、判断两者的交集边界，如果没有交集,则取上一行的列宽,如果是矩形,则与最大面积比较，大于则修改最大面积;
    5、如果有交集，如果矩形三维数组还有元素要匹配，则把当前的交集添加到尾部，继续下一轮匹配，
      如果没有元素要匹配，则取交集的列宽来计算面积与最大面积比较，大于则修改最大面积
*/

function getMaxRect(arr, /* result, */ area, row = 1) {

  let prevItem = arr.pop(),
    nextItem = arr.pop(),
    prevItemLen = prevItem.length,
    nextItemLen = nextItem.length,
    intersectionColWidth = 1,
    intersectionColMaxWidth = 1,
    intersectionStart,
    intersectionEnd
    ;

  row++;

  for (let i = 0; i < prevItemLen; i++) {

    for (let j = 0, start, end; j < nextItemLen; j++) {

      start = Math.max(prevItem[i][0], nextItem[j][0]);
      end = Math.min(prevItem[i][1], nextItem[j][1]);

      intersectionColWidth = end - start;

      // 避免相邻两个数的差值为1（实际宽度为2）没有为intersectionStart,intersectionEnd赋值
      if (intersectionColWidth >= intersectionColMaxWidth) {
        intersectionColMaxWidth = intersectionColWidth;
        intersectionStart = start;
        intersectionEnd = end;
      }
    }
  }

  if (intersectionStart === undefined || intersectionEnd === undefined) {

    // 前两行匹配失败
    if (row < 3) {
      return false;
    }

    // 前面匹配失败,则使用上一行的列宽
    intersectionColWidth = prevItem[0][1] - prevItem[0][0] + 1;

    // 是矩形
    if (intersectionColWidth > 1) {

      let currArea = (row - 1) * intersectionColWidth;

      if (currArea > area.max) {

        area.max = currArea;
      }

      // result.push(area);
    }
  }
  else {

    if (arr.length > 0) {

      arr.push([
        [intersectionStart, intersectionEnd]
      ]);

      getMaxRect(arr, /* result, */ area, row++);
    }
    else {

      /**
       * 从某一行一直计算到最后一行，
       * 这个时候intersectionStart和intersectionEnd一直有值，所以不会进入到if层，
       * 这个时候row就是累计的行数（高），intersectionEnd-intersectionStart+1就是宽
      */
      let currArea = row * (intersectionEnd - intersectionStart + 1);

      if (currArea > area.max) {

        area.max = currArea;
      }

      // result.push(area);
    }
  }
}

export default arr => {
  // 参数判断
  if (!Array.isArray(arr)) {

    throw TypeError('please transfer a array, thanks!');
  }

  let arrLen = arr.length;

  if (arrLen < 2) {

    throw TypeError("please transfer a array length >= 2, thanks!");
  }

  arr.forEach((item) => {

    if (!Array.isArray(item) || item.some((binary) => !/^0|1$/.test(binary))) {

      throw TypeError('please transfer a bidimensional array with value is binary, thanks!');
    }
  });

  let binaryOneReg = /1{2,}/g,
    binaryOneArr = arr.map((item) => {

      let binaryOneArray = null,
        itemStr = item.join(""),
        result = []
        ;

      while ((binaryOneArray = binaryOneReg.exec(itemStr)) !== null) {
        let startIndex = binaryOneArray.index;
        result.push([startIndex, startIndex + binaryOneArray[0].length - 1]);
      }

      return result;
    }),
    area = { max: 0 }
    ;

  while (binaryOneArr.length > 1) {

    getMaxRect([].concat(binaryOneArr), /* result, */ area);

    binaryOneArr.pop();
  }

  return area.max > 0 ? area.max : -1;
}