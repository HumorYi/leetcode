import grayCode from "../../code/array/lession4";

// 二进制测试
/* let type = "binary";
let tests = [
  {
    input: 0,
    output: ['0']
  },
  {
    input: 1,
    output: ['0', '1']
  },
  {
    input: 2,
    output: ['00', '01', '11', '10']
  },
  {
    input: 3,
    output: ['000', '001', '011', '010', '110', '111', '101','100']
  },
]; */

// 十进制测试
let type = "decimal";
let tests = [
  {
    input: 0,
    output: [0]
  },
  {
    input: 1,
    output: [0, 1]
  },
  {
    input: 2,
    output: [0,1,3,2]
  },
  {
    input: 3,
    output: [0,1,3,2,6,7,5,4]
  },
];

tests.forEach(item => {
  test(`grayCode: ${item.input} To ${item.output}`, () => {
    expect(grayCode(item.input, type)).toEqual(item.output);
  });
});