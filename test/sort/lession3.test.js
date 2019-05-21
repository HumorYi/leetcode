import maxSpace from '../../code/sort/lession3'

let tests = [
  {
    input: [3,6,9,1],
    output: 3
  },
  {
    input: [10],
    output: 0
  },
  {
    input: [10, 20, 5, 4, 3, 50],
    output: 30
  },
  {
    input: [13, 16, 19, 1],
    output: 12
  },
];

tests.forEach(item => {
  test(`maxSpace: ${item.input} To ${item.output}`, () => {
    expect(maxSpace(item.input)).toBe(item.output);
  });
});