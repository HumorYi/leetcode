/*
  141. 环形链表

  给定一个链表，判断链表中是否有环。

  为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

  示例 1：
    输入：head = [3,2,0,-4], pos = 1
    输出：true
    解释：链表中有一个环，其尾部连接到第二个节点。


  示例 2：
    输入：head = [1,2], pos = 0
    输出：true
    解释：链表中有一个环，其尾部连接到第一个节点。


  示例 3：
    输入：head = [1], pos = -1
    输出：false
    解释：链表中没有环。

  进阶：你能用 O(1)（即，常量）内存解决此问题吗？
*/

/*
  解题思路：
    0、参数判断：
    1、不要只局限于题意，先实现，再做限制
    2、这是一个单链表，js没有链表数据结构，使用类来模拟创建链表，
      每一个节点有值和指向下一个节点的指针
    3、使用两个指针来遍历链表，一个快指针和一个慢指针
    4、如何证明链表中有环：
      1、快指针与慢指针相撞
      2、快指针在慢指针后面

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

export default (arr, pos) => {

  // 参数判断
  if (!Array.isArray(arr)) {

    throw TypeError('please transfer a array arr, thanks!');

  }

  if (!Number.isInteger(pos)) {

    throw TypeError('please transfer a integer pos, thanks!');

  }

  // 非链表环
  if (arr.length < 2 || pos === -1) {
    return false;
  }

  let head = new NodeList(arr);
  let slow = head,
      fast = head.next
  ;

  while(slow) {

    // 快指针不断重复走
    if (!fast || !fast.next) {

      fast = head;

    }

    // 快指针与慢指针相撞或出现在慢指针后面
    if (fast === slow || fast.next === slow) {

      return true;

    }

    slow = slow.next;
    fast = fast.next.next;

    // 慢指针遍历结束，则表明没有环
    if (!slow) {

      break;

    }

  }

  return false;

}