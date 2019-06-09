import getSuperUgly from '../../code/heap/lession3'

let tests = [
  {
    input: {
      n: 12,
      primes: [2, 7, 13, 19]
    },
    output: 32
  },
];

tests.forEach(item => {

  test(`getSuperUgly : ${item.input} To ${item.output}`, () => {

    expect(getSuperUgly(item.input.n, item.input.primes)).toBe(item.output);

  });

});