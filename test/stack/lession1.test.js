import baseball from '../../code/stack/lession1'

let tests = [
  {
    input: ["5","2","C","D","+"],
    output: 30
  },
  {
    input: ["5","-2","4","C","D","9","+","+"],
    output: 27
  },
];

tests.forEach(item => {
  test(`baseball: ${item.input} To ${item.output}`, () => {
    expect(baseball(item.input)).toBe(item.output);
  });
});