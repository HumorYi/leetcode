import isSameTree from '../../code/btree/lession3'

let tests = [
  {
    input: [
      [1, 2, 3],
      [1, 2, 3]
    ],
    output: true
  },
  {
    input: [
      [1, 2, 3, 4, 5],
      [1, 2, 3, 4, 5]
    ],
    output: true
  },
  {
    input: [
      [1, 2, 3, 4, 5, 6, 7],
      [1, 2, 3, 4, 5, 6, 7]
    ],
    output: true
  },
  {
    input: [
      [1, 2, 3, 4, 5, 6, 7, 8],
      [1, 2, 3, 4, 5, 6, 7, 8]
    ],
    output: true
  },
  {
    input: [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, null]
    ],
    output: false
  },
  {
    input: [
      [1, 2],
      [1, null, 2]
    ],
    output: false
  },
  {
    input: [
      [1, 2, 1],
      [1, 1, 2]
    ],
    output: false
  }
]

tests.forEach(item => {
  test(`isSameTree : ${item.input[0]} & ${item.input[1]} To ${item.output}`, () => {
    expect(isSameTree(item.input[0], item.input[1])).toBe(item.output)
  })
})
