import isBST from '../../code/btree/lession2'

let tests = [
  {
    input: [2, 1, 3],
    output: true
  },
  {
    input: [2, 1, 1],
    output: false
  },
  {
    input: [5, 1, 4, null, null, 3, 6],
    output: false
  },
];

tests.forEach(item => {

  test(`isBST : ${item.input} To ${item.output}`, () => {

    expect(isBST(item.input)).toBe(item.output);

  });

});