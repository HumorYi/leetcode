import telCombination from "../../code/array/lession1";

let tests = [
  {
    input: "23",
    output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
  },
  {
    input: "234",
    output: [
      'adg', 'adh', 'adi',
      'aeg', 'aeh', 'aei',
      'afg', 'afh', 'afi',
      'bdg', 'bdh', 'bdi',
      'beg', 'beh', 'bei',
      'bfg', 'bfh', 'bfi',
      'cdg', 'cdh', 'cdi',
      'ceg', 'ceh', 'cei',
      'cfg', 'cfh', 'cfi'
    ]
  }
];

tests.forEach(item => {
  test(`telCombination: ${item.input} To ${item.output}`, () => {
    expect(telCombination(item.input)).toEqual(item.output);
  });
});
