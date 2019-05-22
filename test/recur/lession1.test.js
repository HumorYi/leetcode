import searchIP from '../../code/recur/lession1'

let tests = [
  {
    input: "25525511135",
    output: ["255.255.11.135", "255.255.111.35"]
  },
  {
    input: "1111",
    output: ["1.1.1.1"]
  },
  {
    input: "11111",
    output: ["1.1.1.11", "1.1.11.1", "1.11.1.1", "11.1.1.1"]
  },
  {
    input: "111111",
    output: [
      "1.1.1.111", "1.1.11.11", "1.1.111.1", "1.11.1.11", "1.11.11.1", "1.111.1.1",
      "11.1.1.11", "11.1.11.1", "11.11.1.1",
      "111.1.1.1"
  ]
  },
  {
    input: "12314123412",
    output: ["123.141.234.12"]
  },
];

tests.forEach(item => {
  test(`searchIP: ${item.input} To ${item.output}`, () => {
    expect(searchIP(item.input)).toEqual(item.output);
  });
});