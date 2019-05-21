import choiceSort from '../../code/sort/lession2'

let tests = [
  {
    input: [1, 3, 5, 2, 4, 6],
    output: [1, 2, 3, 4, 5, 6]
  },
  {
    input: [1, 6, 9, 2, 9, 6],
    output: [1, 2, 6, 6, 9, 9]
  },
];

tests.forEach(item => {
  test(`choiceSort: ${item.input} To ${item.output}`, () => {
    expect(choiceSort(item.input)).toEqual(item.output);
  });
});