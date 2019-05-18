import reverseByWorld from "../../code/string/lession1";

let tests = [
  {
    input: "Let's take LeetCode contest",
    output: "s'teL ekat edoCteeL tsetnoc"
  },
  {
    input: "bamboo is too cool",
    output: "oobmab si oot looc"
  },
];

tests.forEach(item => {
  test(`reverseByWorld: ${item.input} To ${item.output}`, () => {
    expect(reverseByWorld(item.input)).toBe(item.output);
  });
});