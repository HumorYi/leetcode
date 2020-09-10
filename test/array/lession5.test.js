import twoSum from '../../code/array/lession5'

const tests = [
  {
    input: {
      nums: [2, 7, 11, 15],
      target: 9
    },
    output: [0, 1]
  },
  {
    input: {
      nums: [4, 7, 11, 515],
      target: 18
    },
    output: [1, 2]
  },
  {
    input: {
      nums: [22, 7, 11, 15],
      target: 37
    },
    output: [0, 3]
  },
  {
    input: {
      nums: [2, 17, 11, 15],
      target: 32
    },
    output: [1, 3]
  }
]

tests.forEach(item => {
  test(`twoSum: ${item.input.nums} ${item.input.target} To ${item.output}`, () => {
    expect(twoSum(item.input.nums, item.input.target)).toEqual(item.output)
  })
})
