/*
  30. 串联所有单词的子串

  给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。

  注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。

  示例 1：
    输入：
      s = "barfoothefoobarman",
      words = ["foo","bar"]
    输出：[0,9]
    解释：
      从索引 0 和 9 开始的子串分别是 "barfoor" 和 "foobar" 。
      输出的顺序不重要, [9,0] 也是有效答案。

  示例 2：
    输入：
      s = "wordgoodgoodgoodbestword",
      words = ["word","good","best","word"]
    输出：[]
*/

/*
  解题思路：
    0、参数判断：
    1、遍历输入的字符串数组，挨个元素拿出来与后续元素进行拼接之后再匹配原字符串
      查找规律：
        假设输入有4个元素 ['word','good','best','word']
          [
            [ 'word', 'good', 'best', 'word' ],
            [ 'word', 'good', 'word', 'best' ],
            [ 'word', 'best', 'good', 'word' ],
            [ 'word', 'best', 'word', 'good' ],
            [ 'word', 'word', 'good', 'best' ],
            [ 'word', 'word', 'best', 'good' ],

            [ 'good', 'word', 'best', 'word' ],
            [ 'good', 'word', 'word', 'best' ],
            [ 'good', 'best', 'word', 'word' ],
            [ 'good', 'best', 'word', 'word' ],
            [ 'good', 'word', 'word', 'best' ],
            [ 'good', 'word', 'best', 'word' ],

            [ 'best', 'word', 'good', 'word' ],
            [ 'best', 'word', 'word', 'good' ],
            [ 'best', 'good', 'word', 'word' ],
            [ 'best', 'good', 'word', 'word' ],
            [ 'best', 'word', 'word', 'good' ],
            [ 'best', 'word', 'good', 'word' ],

            [ 'word', 'word', 'good', 'best' ],
            [ 'word', 'word', 'best', 'good' ],
            [ 'word', 'good', 'word', 'best' ],
            [ 'word', 'good', 'best', 'word' ],
            [ 'word', 'best', 'word', 'good' ],
            [ 'word', 'best', 'good', 'word' ]
          ]
    2、先匹配第1个元素与剩余元素的组合，再递归匹配后续元素
*/

let search = (str, words, wordsLen, currResult = [], result = []) => {
  if (currResult.length === wordsLen) {
    let index = str.indexOf(currResult.join(""));
    index !== -1 && result.push(index);
  }
  else {
    // 遍历每一个元素，得到当前元素与其他元素的组合，递归
    words.forEach((item, i) => {
      let tmp = [...words];
      tmp.splice(i, 1);
      search(str, tmp, wordsLen, currResult.concat(item), result);
    });

    // 返回升序下标数组
    return result.sort((a, b) => a - b);
  }
};

export default (str, words) => {
  // 参数判断
  if (typeof str !== 'string' || !str) {
    throw TypeError('please transfer a number string between 4 and 12, thanks!');
  }

  if (Object.prototype.toString.call(words).slice(8, -1) !== "Array") {
    throw TypeError('please transfer a array words');
  }

  // 计算所有的单词数量
  let wordsLen = words.length;
  if (wordsLen === 0) {
    throw new TypeError("words is empty array");
  }

  // 计算字符串的总长度
  let strLen = str.length
  // 如果字符串的长度小于所有单词的总长度直接返回
  if (strLen < words.join('').length) { return []; }

  // 只有一个单词匹配，直接返回
  if (wordsLen === 1) {
    let index = str.indexOf(words[0]);
    return index !== -1 ? [index] : [];
  }

  // 先遍历一遍单词列表，确保每个单词都会出现在字符串中
  if (words.some(item => str.indexOf(item) === -1)) { return []; };

  // return search(str, words, wordsLen);

  

  /*
    search 的算法是根据利用组合思想解决这个问题的，这个思想简单易于学习。缺点是当数据量大的时候组合数太多导致效率变低。

    下面的算法是利用查找每个单词在字符串的位置，然后通过计算这些位置是不是连续的。
      比如 abforbarcd,[for,bar]，那么for的起始位置是2,bar的起始位置是5;说明这两个单词是连续的2+3(for的长度)=5
      for:[{start:2,end:5}]
      bar:[{start:5,end:8}]
      判断上一个单词的end和下一个单词的start是不是相同来计算两个单词是不是挨着
*/
  // 计算所有单词出现的起始位置和截止位置
  let pos = {};
  // 遍历所有单词查找在字符串中的起始位置和截止位置
  for (let i = 0; i < wordsLen; i++) {
    let word = words[i];
    // 如果获取到该单词，则进行下一个
    if (pos[word]) { continue; }

    let wordLen = word.length;
    // 获取字符串中每个单词出现的开始位置和结束位置
    let tmp = [];
    let arr;
    let reg = new RegExp(word, 'g');
    while ((arr = reg.exec(str)) !== null) {
      tmp.push({ start: arr.index, end: arr.index + wordLen });
    }

    // 前面已经做过验证，确保所有单词都会出现在字符串中
    // if (tmp.length === 0) { return false; }

    // 保存当前单词的位置
    pos[word] = [...tmp];

    reg = null;
    arr = null;
    tmp = null;
    wordLen = null;
  }

  // 只要有一个单词没找到说明不能匹配到连续的字符串
  // if (words.some(item => !pos[item])) { return []; }

  // 记录最终返回的单词位置结果
  let result = [];

  // 计算所有单词的位置
  let match = poses => {
    // 记录是不是所有单词都被匹配到了，每一次都应该把所有单词都包括进来并且是相邻的
    let record = []
    let posesLen = Object.keys(poses).length
    // 如果没有单词的位置说明处理结束了
    if (posesLen < 1) { return -1 }

    while (true) {
      // 每次循环应该把记录清空
      record.length = 0;
      // 按照起始位置进行升序排序
      let minValue = Number.MAX_SAFE_INTEGER;
      let minKey = '';
      // 优先找到所有单词其实位置最小的单词开始匹配
      for (let [key, value] of Object.entries(poses)) {
        if (!value.length) { return false; }

        let start = value[0].start;
        if (start < minValue) {
          minKey = key;
          minValue = start;
        }
      }

      if (!minKey) { return false; }

      // 起始位置最小的单词
      let first = poses[minKey].shift()
      if (!first) { return false }

      // 记录下这个起始位置
      let start = first.start

      // 记录words列表中的单词
      let index = words.findIndex(item => item === minKey);
      index !== -1 && !record.includes(index) && record.push(index);

      // 每次循环要匹配到所有单词
      for (let i = 1; i < wordsLen; i++) {
        for (let j = 0, next, pose; j < wordsLen; j++) {
          if (record.includes(j)) { continue; }

          pose = poses[words[j]];
          if (pose.length === 0) { return false; }

          next = pose.find(item => item.start === first.end);
          if (next) {
            record.push(j);
            first = next;
            break;
          }
        }
      }

      // 如果所有单词的顺序是挨着的，记录下当前的起始位置
      record.length === wordsLen && !result.includes(start) && result.push(start);
    }
  };

  match(pos);

  return result;
}