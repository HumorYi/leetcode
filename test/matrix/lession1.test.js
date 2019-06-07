import spiralMatrix from '../../code/matrix/lession1'

let tests = [
  {
    input: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ],
    output: [1, 2, 3, 6, 9, 8, 7, 4, 5]
  },
  {
    input: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12]
    ],
    output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
  },
];

tests.forEach(item => {

  test(`spiralMatrix : ${item.input} To ${item.output}`, () => {

    expect(spiralMatrix(item.input)).toEqual(item.output);

  });

});