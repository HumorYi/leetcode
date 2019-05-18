import binarySubStringRepeatCount from "../../code/string/lession2";

let tests = [
  {
    input: "00110011",
    output: 6
  },
  {
    input: "10101",
    output: 4
  },
];

tests.forEach(item => {
  test(`binarySubStringRepeatCount: ${item.input} To ${item.output}`, () => {
    expect(binarySubStringRepeatCount(item.input)).toBe(item.output);
  });
});