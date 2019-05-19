import isCanFlowerbed from "../../code/array/lession3";

let tests = [
  {
    input: { flowerbed: [1, 0, 0, 0, 1], n: 1 },
    output: true
  },
  {
    input: { flowerbed: [1, 0, 0, 0, 1], n: 2 },
    output: false
  },
  {
    input: { flowerbed: [0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0], n: 5 },
    output: true
  },
  {
    input: { flowerbed: [0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0], n: 12 },
    output: true
  },
];

tests.forEach(item => {
  test(`isCanFlowerbed: ${item.input.flowerbed}, ${item.input.n} To ${item.output}`, () => {
    expect(isCanFlowerbed(item.input.flowerbed, item.input.n)).toEqual(item.output);
  });
});
