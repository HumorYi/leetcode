import lemonadeChange from '../../code/greed/lession2'

let tests = [
  {
    input: [5,5,5,10,20],
    output: true
  },
  {
    input: [5,5,10],
    output: true
  },
  {
    input: [10,10],
    output:false
  },
  {
    input: [5,5,10,10,20],
    output:false
  },
];

tests.forEach(item => {

  test(`lemonadeChange : ${item.input} To ${item.output}`, () => {

    expect(lemonadeChange(item.input)).toBe(item.output);

  });

});