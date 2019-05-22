import searchSubStrIndex from '../../code/recur/lession2'

let tests = [
  {
    input: {
      str: "barfoothefoobarman",
      words: ["foo","bar"]
    },
    output: [0,9]
  },
  {
    input: {
      str: "wordgoodgoodgoodbestword",
      words: ["word","good","best","word"]
    },
    output: []
  },
  {
    input: {
      str: "whatthefuckhahafuckthewhat",
      words: ["what","the","fuck"]
    },
    output: [0, 15]
  },
];

tests.forEach(item => {
  test(`searchSubStrIndex: ${item.input.str}, ${item.input.words} To ${item.output}`, () => {
    expect(searchSubStrIndex(item.input.str, item.input.words)).toEqual(item.output);
  });
});