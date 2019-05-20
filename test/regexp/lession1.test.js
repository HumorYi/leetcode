import subStrLoop from '../../code/regexp/lession1'

let tests = [
  {
    input: "abab",
    output: true
  },
  {
    input: "aba",
    output: false
  },
  {
    input: "abcabcabcabc",
    output: true
  },
  {
    input: "abaaba",
    output: true
  },
  {
    input: "abababab",
    output: true
  },
];

tests.forEach(item => {
  test(`subStrLoop: ${item.input} To ${item.output}`, () => {
    expect(subStrLoop(item.input)).toBe(item.output);
  });
});