import leastInterval from '../../code/queue/lession2'

let tests = [
  {
    input: {
      tasks: ["A", "A", "A", "B", "B", "B"],
      n: 2
    },
    output: 8
  },
  {
    input: {
      tasks: ["A", "A", "B", "B", "C", "C", "D", "D"],
      n: 2
    },
    output: 8
  },
];

tests.forEach(item => {
  test(`leastInterval: ${item.input} To ${item.output}`, () => {
    expect(leastInterval(item.input.tasks, item.input.n)).toEqual(item.output);
  });
});