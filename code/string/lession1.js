/*
  557. 反转字符串中的单词 III

  给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。

  示例 1:

  输入: "Let's take LeetCode contest"
  输出: "s'teL ekat edoCteeL tsetnoc"
  注意：在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
*/

export default str => {
  // 方式一：
  // return str.split(" ").map(item => item.split("").reverse().join("")).join(" ");

  // 方式二：
  // return str.split(/\s/g).map(item => item.split("").reverse().join("")).join(" ");

  // 方式三：
  // return str.match(/[A-z']+/g).map(item => item.split("").reverse().join("")).join(" ");

  // 方式四：
  return str.replace(/[A-z']+/g, world => Array.prototype.slice.call(world).reverse().join(""));

  // 方式五：
  // return str.replace(/\b[A-z']+/g, world => Array.prototype.slice.call(world).reverse().join(""));
}