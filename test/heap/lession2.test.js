import getMaxHeap from '../../code/heap/lession2'

let tests = [
  {
    input: "tree",
    output: "eetr"
  },
  {
    input: "cccaaa",
    output: "cccaaa"
  },
  {
    input: "Aabb",
    output: "bbAa"
  },
  {
    input: "chcaa",
    output: "ccaah|aacch"
  },
];

tests.forEach(item => {

  test(`getMaxHeap : ${item.input} To ${item.output}`, () => {

    expect(getMaxHeap(item.input)).toMatch(new RegExp(item.output));

  });

});