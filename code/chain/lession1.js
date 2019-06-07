/*
  148. 排序链表

  在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。

  示例 1:
    输入: 4->2->1->3
    输出: 1->2->3->4

  示例 2:
    输入: -1->5->3->4->0
    输出: -1->0->3->4->5
*/

/*
  解题思路：
    0、参数判断：
    1、不要只局限于题意，先实现，再做限制
    2、这是一个单链表，js没有链表数据结构，使用类来模拟创建链表，
      每一个节点有值和指向下一个节点的指针
    3、使用快速排序对节点进行排序，通过比较两个节点的值，不断交换指针

  注意：
    节点的指向不能更改，但是节点的值可以更改
*/

// 声明链表的节点
class Node {

  constructor(val) {

    this.val = val;
    this.next = undefined;

  }

}

// 声明链表的数据结构
class NodeList {

  constructor(arr) {

    // 参数判断
    if (!Array.isArray(arr)) {

      throw TypeError('please transfer a array, thanks!');

    }

    let list = [...arr],
        head = new Node(list.shift()), // 声明链表的头部节点
        next = head
    ;

    list.forEach((item) => {

      next.next = new Node(item);
      next = next.next;

    });

    return head;

  }

}

// 交换两个节点的值
let swapVal = (lastPointer, currPointer) => {

  let lastPointerVal = lastPointer.val;

  lastPointer.val = currPointer.val;
  currPointer.val = lastPointerVal;

}

// 寻找基准元素的节点
let partion = (beginPointer, endPointer) => {

  let beginPointerVal = beginPointer.val,
      lastPointer = beginPointer,
      currPointer = beginPointer.next
  ;

  while (currPointer !== endPointer) {

    if (currPointer.val < beginPointerVal) {

      lastPointer = lastPointer.next;

      lastPointer !== currPointer && swapVal(lastPointer, currPointer);

    }

    currPointer = currPointer.next;

  }

  // 让基准元素跑到中间去
  swapVal(lastPointer, beginPointer);

  return lastPointer;

}

// 节点排序
let nodeSort = (beginPointer, endPointer) => {

  if (beginPointer !== endPointer) {

    let part = partion(beginPointer, endPointer);

    // 递归左边
    nodeSort(beginPointer, part);
    // 递归右边
    nodeSort(part.next, endPointer);

  }

}

export default (arr) => {

  // 参数判断
  if (!Array.isArray(arr)) {

    throw TypeError('please transfer a array, thanks!');

  }

  let head = new NodeList(arr),
      sortResult = []
  ;

  nodeSort(head);

  let next = head;

  while (next) {

    sortResult.push(next.val);
    next = next.next;

  }

  return sortResult;

}