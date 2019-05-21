import odevitySort from '../../code/sort/lession4'

let tests = [
  {
    input: [3,2,9,4],
    output: [2,3,4,9]
  },
  {
    input: [10, 20, 5, 7, 3, 50],
    output: [10, 5, 20, 7, 50, 3]
  },
];

tests.forEach(item => {
  test(`odevitySort: ${item.input} To ${item.output}`, () => {
    expect(odevitySort(item.input)).toEqual(item.output);
  });
});