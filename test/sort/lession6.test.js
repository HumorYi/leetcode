import maxKItem from '../../code/sort/lession6'

let tests = [
  {
    input: [1,2,0],
    output: 3
  },
  {
    input: [3,4,-1,1],
    output: 2
  },
  {
    input: [7,8,9,11,12],
    output: 1
  },
  {
    input: [],
    output: 1
  },
  {
    input: [3],
    output: 1
  },
  {
    input: [1],
    output: 2
  },
];

tests.forEach(item => {
  test(`maxKItem: ${item.input} To ${item.output}`, () => {
    expect(maxKItem(item.input)).toBe(item.output);
  });
});