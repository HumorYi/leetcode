/*
  1. 两数之和

  给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

  你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

  示例:
    给定 nums = [2, 7, 11, 15], target = 9

    因为 nums[0] + nums[1] = 2 + 7 = 9
    所以返回 [0, 1]
 */

/**
 * 解题思路：时间换空间
 *  1、两层遍历，找到 外层当前值 与 内层当前值 相加 等于 目标值 的下标
 *
 *  时间复杂度O(n^2)
 *  空间复杂度O(1)
 */
/* function twoSum(nums, target) {
    const numsLen = nums.length
    const lastIndex = numsLen-1
    for (let i = 0; i < lastIndex; i++) {
        for (let j = i+1; j < numsLen; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j]
            }
        }
    }

    return []
}; */

/**
 * 解题思路：空间换时间
 *  1、用⼀个对象做中间存储，存储需要的数组 计算次数N 需要⼀个额外的空间来存储这个对象
 *  时间复杂度O(n)
 *  空间复杂度O(n)
 */
export default function twoSum(nums, target) {
  const cache = new Map()

  for (let i = nums.length - 1; i >= 0; i--) {
    const num = nums[i]
    const result = target - num

    if (cache.has(result)) {
      return [i, cache.get(result)]
    }

    cache.set(num, i)
  }

  return []
}
