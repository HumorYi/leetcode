import MyCircularQueue from '../../code/queue/lession1'

test(`MyCircularQueue1: `, () => {
  let queue = new MyCircularQueue(4)

  expect(queue.deQueue()).toBe(false)
  expect(queue.isFull()).toBe(false)
  expect(queue.isEmpty()).toBe(true)
  expect(queue.Front()).toBe(-1)
  expect(queue.Rear()).toBe(-1)

  expect(queue.enQueue(2)).toBe(true)
  expect(queue.isFull()).toBe(false)
  expect(queue.enQueue(1)).toBe(true)
  expect(queue.Front()).toBe(2)
  expect(queue.Rear()).toBe(1)
  expect(queue.isEmpty()).toBe(false)
  expect(queue.deQueue()).toBe(true)
})

test(`MyCircularQueue2: `, () => {
  let queue = new MyCircularQueue(4)

  expect(queue.enQueue(1)).toBe(true)
  expect(queue.enQueue(2)).toBe(true)
  expect(queue.Rear()).toBe(2)
  expect(queue.enQueue(3)).toBe(true)
  expect(queue.enQueue(4)).toBe(true)

  expect(queue.isFull()).toBe(true)
  expect(queue.isEmpty()).toBe(false)
  expect(queue.enQueue(5)).toBe(false)
  expect(queue.Front()).toBe(1)
  expect(queue.Rear()).toBe(4)

  expect(queue.enQueue(5)).toBe(false)
  expect(queue.deQueue()).toBe(true)

  expect(queue.isFull()).toBe(false)
  expect(queue.enQueue(1)).toBe(true)
  expect(queue.isFull()).toBe(true)
  expect(queue.Rear()).toBe(4)

  expect(queue.enQueue(1)).toBe(false)
})

test(`MyCircularQueue3: `, () => {
  let queue = new MyCircularQueue(4)

  expect(queue.enQueue(1)).toBe(true)
  expect(queue.enQueue(2)).toBe(true)
  expect(queue.enQueue(3)).toBe(true)
  expect(queue.enQueue(4)).toBe(true)

  expect(queue.isFull()).toBe(true)

  expect(queue.deQueue()).toBe(true)
  expect(queue.deQueue()).toBe(true)
  expect(queue.deQueue()).toBe(true)
  expect(queue.deQueue()).toBe(true)

  expect(queue.isEmpty()).toBe(true)
})

test(`MyCircularQueue4: `, () => {
  let queue = new MyCircularQueue(4)

  expect(queue.enQueue(1)).toBe(true)
  expect(queue.enQueue(2)).toBe(true)
  expect(queue.enQueue(3)).toBe(true)
  expect(queue.enQueue(4)).toBe(true)

  expect(queue.isFull()).toBe(true)

  expect(queue.deQueue()).toBe(true)
  expect(queue.deQueue()).toBe(true)
  expect(queue.enQueue(5)).toBe(true)
  expect(queue.deQueue()).toBe(true)
  expect(queue.Front()).toBe(3)
  expect(queue.Rear()).toBe(4)

  expect(queue.deQueue()).toBe(true)
  expect(queue.enQueue(6)).toBe(true)
  expect(queue.enQueue(7)).toBe(true)
  expect(queue.deQueue()).toBe(true)
  expect(queue.enQueue(8)).toBe(true)
  expect(queue.Front()).toBe(7)
  expect(queue.Rear()).toBe(7)

  expect(queue.deQueue()).toBe(true)
  expect(queue.deQueue()).toBe(true)
  expect(queue.Front()).toBe(4)
  expect(queue.Rear()).toBe(4)

  expect(queue.isEmpty()).toBe(false)
})
