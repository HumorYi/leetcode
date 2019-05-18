import cardGroup from "../../code/array/lession2";

let tests = [
  {
    input: [1,2,3,4,4,3,2,1],
    output: true
  },
  {
    input: [1,1,1,2,2,2,3,3],
    output: false
  },
  {
    input: [1],
    output: false
  },
  {
    input: [1,1],
    output: true
  },
  {
    input: [1,1,2,2,2,2],
    output: true
  },
];

tests.forEach(item => {
  test(`cardGroup: ${item.input} To ${item.output}`, () => {
    expect(cardGroup(item.input)).toEqual(item.output);
  });
});
