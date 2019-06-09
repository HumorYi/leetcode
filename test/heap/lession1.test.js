import getMaxHeap from '../../code/heap/lession1'

let tests = [
  {
    input: [1, 10, 9, 5, 3, 11],
    output: [1, 3, 5, 9, 10, 11]
  },
];

tests.forEach(item => {

  test(`getMaxHeap : ${item.input} To ${item.output}`, () => {

    expect(getMaxHeap(item.input)).toEqual(item.output);

  });

});