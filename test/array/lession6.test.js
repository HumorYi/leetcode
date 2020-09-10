import exist from '../../code/array/lession6'

const tests = [
  {
    input: {
      board: [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
      ],
      word: 'ABCCED'
    },
    output: true
  },
  {
    input: {
      board: [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
      ],
      word: 'SEE'
    },
    output: true
  },
  {
    input: {
      board: [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
      ],
      word: 'ABCB'
    },
    output: false
  }
]

tests.forEach(item => {
  test(`exist: ${item.input.board} ${item.input.word} To ${item.output}`, () => {
    expect(exist(item.input.board, item.input.word)).toBe(item.output)
  })
})
