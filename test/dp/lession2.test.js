import findCheapestPrice from '../../code/dp/lession2'

let tests = [
  {
    input: {
      n: 3,
      fights: [[0,1,100],[1,2,100],[0,2,500]],
      src: 0,
      dst: 2,
      k: 1
    },
    output: 200
  },
  {
    input: {
      n: 3,
      fights: [[0,1,100],[1,2,100],[0,2,500]],
      src: 0,
      dst: 2,
      k: 0
    },
    output: 500
  },
];

tests.forEach(item => {

  test(`findCheapestPrice : ${item.input} To ${item.output}`, () => {

    expect(findCheapestPrice(item.input.n, item.input.fights, item.input.src, item.input.dst, item.input.k)).toBe(item.output);

  });

});