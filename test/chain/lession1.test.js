import chainSort from '../../code/chain/lession1'

let tests = [
  {
    input: [4, 1, 3, 2, 7, 9, 10, 12, 6],
    output: [1, 2, 3, 4, 6, 7, 9, 10, 12]
  },
  {
    input: [4, 2, 3, 1],
    output: [1, 2, 3, 4]
  },
  {
    input: [-1, 5, 3, 4, 0],
    output: [-1, 0, 3, 4, 5]
  },
];

tests.forEach(item => {

  test(`chainSort : ${item.input} To ${item.output}`, () => {

    expect(chainSort(item.input)).toEqual(item.output);

  });

});