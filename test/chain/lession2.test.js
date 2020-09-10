import isCircleChain from '../../code/chain/lession2'

let tests = [
  {
    input: {
      head: [3, 2, 0, -4],
      pos: 1
    },
    output: true
  },
  {
    input: {
      head: [1, 2],
      pos: 0
    },
    output: true
  },
  {
    input: {
      head: [1],
      pos: -1
    },
    output: false
  }
]

tests.forEach((item, i) => {
  test(`isCircleChain ${i} : ${item.input} To ${item.output}`, () => {
    expect(isCircleChain(item.input.head, item.input.pos)).toBe(item.output)
  })
})
