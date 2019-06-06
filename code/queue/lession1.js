/*
  622. 设计循环队列

  设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于 FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。

  循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。

  你的实现应该支持如下操作：
    MyCircularQueue(k): 构造器，设置队列长度为 k 。
    Front: 从队首获取元素。如果队列为空，返回 -1 。
    Rear: 获取队尾元素。如果队列为空，返回 -1 。
    enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
    deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
    isEmpty(): 检查循环队列是否为空。
    isFull(): 检查循环队列是否已满。


  示例：
    MyCircularQueue circularQueue = new MycircularQueue(3); // 设置长度为 3

    circularQueue.enQueue(1);  // 返回 true

    circularQueue.enQueue(2);  // 返回 true

    circularQueue.enQueue(3);  // 返回 true

    circularQueue.enQueue(4);  // 返回 false，队列已满

    circularQueue.Rear();  // 返回 3

    circularQueue.isFull();  // 返回 true

    circularQueue.deQueue();  // 返回 true

    circularQueue.enQueue(4);  // 返回 true

    circularQueue.Rear();  // 返回 4

  提示：
    所有的值都在 0 至 1000 的范围内；
    操作数将在 1 至 1000 的范围内；
    请不要使用内置的队列库。
*/

/*
  解题思路：
    0、参数判断：
    1、根据题意创建对应的构造函数和成员
    2、有一个细点需要注意一下：循环队列的队首和队尾 索引指向问题，具体处理看代码
*/


let queueConfig = {
  itemNullMark: undefined,
  frontNormalIndex: 0,
  rearNormalIndex: 0
}

export default class MyCircularQueue {
  /**
   * @desc Creates an instance of MyCircularQueue.
   *
   * @param {Number} k 队列长度  1 <= k <= 1000
   *
   * @memberof MyCircularQueue
   */
  constructor(k) {

    // 参数判断
    if (!Number.isInteger(k)) {
      throw TypeError("please transfer a integer, thanks!");
    }
    else if (k < 1 || k > 1000) {
      throw RangeError("please transfer a val between 1 and 1000, thanks!");
    }


    this.queue = new Array(k);
    // 队首下标
    this.front = queueConfig.frontNormalIndex;
    // 队尾下标
    this.rear = queueConfig.rearNormalIndex;
  }

  /**
   * @desc 从队首获取元素。如果队列为空，返回 -1
   *
   * @memberof MyCircularQueue
   *
   * @return {any | -1}
   */
  Front() {

    return this.isEmpty() ? -1 : this.queue[this.front];
  }

  /**
   * @desc 获取队尾元素。如果队列为空，返回 -1
   *
   * @memberof MyCircularQueue
   *
   * @return {any | -1}
   */
  Rear() {
    if (this.isEmpty()) {

      return -1;
    }
    else if (this.isFull()) {

      return this.queue[this.getQueueSize() - 1];
    }
    else if (this.rear === queueConfig.rearNormalIndex) {

      if (this.queue[this.rear] !== queueConfig.itemNullMark) {

        return this.queue[this.rear];
      }

      return this.queue[this.getQueueSize() - 1];
    }
    else {

      return this.queue[this.rear - 1];
    }
  }

  /**
   * @desc 向循环队列插入一个元素。如果成功插入则返回真
   *
   * @param {Number} val 插入的数值 0 <= val <= 1000
   *
   * @memberof MyCircularQueue
   *
   * @return {Boolean}
   */
  enQueue(val) {

    // 参数判断
    if (!Number.isInteger(val)) {
      throw TypeError("please transfer a integer, thanks!");
    }
    else if (val < 0 || val > 1000) {
      throw RangeError("please transfer a val between 0 and 1000, thanks!");
    }


    if (this.isFull()) {

      return false;
    }

    this.queue[this.rear] = val;
    this.rear = (this.rear + 1) % this.getQueueSize();

    if (this.queue[this.rear] !== queueConfig.itemNullMark) {

      let rearIndex = this.queue.findIndex((item) => item === queueConfig.itemNullMark);

      if (rearIndex !== -1) {

        this.rear = rearIndex;
      }
      else {

        // 证明队列已满
        this.rear = queueConfig.rearNormalIndex;
        this.front = queueConfig.frontNormalIndex;
      }
    }

    return true;
  }

  /**
   * @desc 从循环队列中删除一个元素。如果成功删除则返回真
   *
   * @memberof MyCircularQueue
   *
   * @return {Boolean}
   */
  deQueue() {
    if (this.isEmpty()) {

      return false;
    }

    if (this.queue[queueConfig.frontNormalIndex] !== queueConfig.itemNullMark) {

      this.queue[queueConfig.frontNormalIndex] = queueConfig.itemNullMark

      this.rear = queueConfig.rearNormalIndex;
      this.front = queueConfig.frontNormalIndex;
    }
    else if (this.queue[this.front] !== queueConfig.itemNullMark) {

      this.queue[this.front] = queueConfig.itemNullMark;
    }

    this.front = (this.front + 1) % this.getQueueSize();

    if (this.queue[this.front] === queueConfig.itemNullMark) {

      let frontIndex = this.queue.findIndex(item => item !== queueConfig.itemNullMark);

      this.front = frontIndex !== -1 ? frontIndex : queueConfig.frontNormalIndex;
    }

    return true;
  }

  /**
   * @desc 检查循环队列是否为空。
   *
   * @memberof MyCircularQueue
   *
   * @return {Boolean}
   */
  isEmpty() {

    return this.front === this.rear && this.queue[this.front] === queueConfig.itemNullMark;
  }

  /**
   * @desc 检查循环队列是否已满。
   *
   * @memberof MyCircularQueue
   *
   * @return {Boolean}
   */
  isFull() {

    return this.front === this.rear && this.queue[this.front] !== queueConfig.itemNullMark;
  }

  /**
   * @desc 获取队列长度
   *
   * @memberof MyCircularQueue
   *
   * @return {Number}
   */
  getQueueSize() {

    return this.queue.length;
  }
}