import isSymmetric from '../../code/btree/lession1'

let tests = [
  {
    input: [1, 2, 2, 3, 4, 4, 3],
    output: true
  },
  {
    input: [1, 2, 2, null, 3, null, 3],
    output: false
  },
  {
    input: [1, 2, 2, 3, 4, 5, 3],
    output: false
  },
  {
    input: [1, 2, 2, 3, 4, 4, 3, 5, 6, 7, 8, 8, 7, 6, 5],
    output: true
  },
];

tests.forEach(item => {

  test(`isSymmetric : ${item.input} To ${item.output}`, () => {

    expect(isSymmetric(item.input)).toBe(item.output);

  });

});