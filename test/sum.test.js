import sum from '../code/sum'

let tests = [
  {
    input: "1 + 2",
    output: 3
  },
  {
    input: "5 + 6",
    output: 11
  },
];

tests.forEach(item => {
  let nums = item.input.split("+");
  let first = Number(nums[0]);
  let second = Number(nums[1]);
  
  test(`sum: ${item.input} To ${item.output}`, () => {
    expect(sum(first, second)).toBe(item.output);
  });
});