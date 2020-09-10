/*
  100. 相同的树

  给定两个树，编写一个函数来检验它们是否相同。

  如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

  示例 1:
    输入:       1         1
              / \       / \
            2   3     2   3

            [1,2,3],   [1,2,3]

    输出: true

  示例 2:
    输入:      1          1
              /           \
            2             2

            [1,2],     [1,null,2]

    输出: false

  示例 3:
    输入:       1         1
              / \       / \
            2   1     1   2

            [1,2,1],   [1,1,2]

    输出: false
*/

/*
  解题思路：
    0、参数判断：

*/

// 创建树节点
class Node {
  /**
   * @desc 构建树节点
   *
   * @param {any} val 节点值
   *
   * @returns {void}
   */
  constructor(val) {
    this.val = val
    this.left = undefined
    this.right = undefined
  }
}

class Tree {
  /**
   * @desc 构建树
   *
   * @param {Array} data 要构建树的数据
   *
   * @returns {Node} 根节点
   */
  constructor(data) {
    // 参数判断
    if (!Array.isArray(data)) {
      throw TypeError('please transfer a array, thanks!')
    }

    // let root = new Node(data[0])
    const root = new Node(data.shift())

    data.length > 0 && this._setNodeRelationship(root, data)
    return root
  }

  /**
   * @desc 设置节点关系
   *
   * @param {Node} root 顶节点
   * @param {Array} data 要生成树的数据，data.length > 1
   *
   * @returns {void}
   */
  _setNodeRelationship(root, data) {
    data.forEach((item, i) => this._insert(root, item, i === 0))
  }

  /**
   * @desc 插入节点
   *
   * @param {Node} node 节点
   * @param {any} val 节点值
   *
   * @returns {void}
   */
  _insert(node, val, isLeft) {
    if (isLeft) {
      if (node.left === undefined) {
        node.left = new Node(val)
      } else {
        this._insert(node.left, val, isLeft)
      }

      return
    }

    if (node.right === undefined) {
      node.right = new Node(val)
    } else {
      this._insert(node.right, val, isLeft)
    }
  }

  /**
   * @desc 不断递归顶节点，判断顶节点的左节点值是否小于顶节点值，
   *  顶节点的右节点值是否大于顶节点值
   *
   * @param {Node} left 左节点
   * @param {Node} right 右节点
   *
   * @returns {Boolean}
   */
  static walk(node1, node2) {
    if (node1 === undefined && node2 === undefined) {
      return true
    }

    if (node1 && node2 && node1.val === node2.val) {
      return Tree.walk(node1.left, node2.left) && Tree.walk(node1.right, node2.right)
    }

    return false
  }

  /**
   * @desc 不断递归左右节点，判断是否相等
   *
   * @param {Node} left 左节点
   * @param {Node} right 右节点
   *
   * @returns {Boolean}
   */
  static isSameTree(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false
    }

    return Tree.walk(new Tree(arr1), new Tree(arr2))
  }
}

export default (arr1, arr2) => {
  // 参数判断
  if (!Array.isArray(arr1)) {
    throw TypeError('please transfer a array, thanks!')
  }
  if (!Array.isArray(arr2)) {
    throw TypeError('please transfer a array, thanks!')
  }

  return Tree.isSameTree(arr1, arr2)
}
