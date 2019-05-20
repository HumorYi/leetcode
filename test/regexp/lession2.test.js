import regModeStr from '../../code/regexp/lession2'

let tests = [
  {
    input: {str: "aa", mode: "a"},
    output: false
  },
  {
    input: {str: "aa", mode: "a*"},
    output: true
  },
  {
    input: {str: "ab", mode: ".*"},
    output: true
  },
  {
    input: {str: "aab", mode: "c*a*b"},
    output: true
  },
  {
    input: {str: "mississippi", mode: "mis*is*p*."},
    output: false
  },
  {
    input: {str: "aaabc", mode: "a*.*dg"},
    output: true
  },
];

tests.forEach(item => {
  test(`regModeStr: ${item.input.str}, ${item.input.mode} To ${item.output}`, () => {
    expect(regModeStr(item.input.str, item.input.mode)).toBe(item.output);
  });
});