import uniquePathsWithObstacles from '../../code/dp/lession1'

let tests = [
  {
    input: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ],
    output: 2
  },
];

tests.forEach(item => {

  test(`uniquePathsWithObstacles : ${item.input} To ${item.output}`, () => {

    expect(uniquePathsWithObstacles(item.input)).toBe(item.output);

  });

});