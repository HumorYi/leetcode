import maxKItem from '../../code/sort/lession5'

let tests = [
  {
    input: {
      arr: [3,2,1,5,6,4],
      k: 2
    },
    output: 5
  },
  {
    input: {
      arr: [3,2,3,1,2,4,5,5,6],
      k: 4
    },
    output: 4
  },
];

tests.forEach(item => {
  test(`maxKItem: ${item.input.arr}, ${item.input.k} To ${item.output}`, () => {
    expect(maxKItem(item.input.arr, item.input.k)).toBe(item.output);
  });
});