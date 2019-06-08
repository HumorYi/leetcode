/*
  98. 验证二叉搜索树

  给定一个二叉树，判断其是否是一个有效的二叉搜索树。

  假设一个二叉搜索树具有如下特征：

  节点的左子树只包含小于当前节点的数。
  节点的右子树只包含大于当前节点的数。
  所有左子树和右子树自身必须也是二叉搜索树。

  示例 1:
    输入:
        2
      / \
      1   3
    输出: true

  示例 2:
    输入:
        5
      / \
      1   4
         / \
        3   6
    输出: false

    解释: 输入为: [5,1,4,null,null,3,6]。
       根节点的值为 5 ，但是其右子节点值为 4
*/

/*
  解题思路：
    0、参数判断：

*/

// 创建二叉树节点
class Node {

  /**
   * @desc 构建二叉树节点
   *
   * @param {any} val 节点值
   *
   * @returns {void}
   */
  constructor(val) {

    this.val = val;
    this.left = undefined;
    this.right = undefined;

  }

}

class Tree {

  /**
   * @desc 构建二叉树
   *
   * @param {Array} data 要构建二叉树的数据
   *
   * @returns {Node} 根节点
   */
  constructor(data) {

    // 参数判断
    if (!Array.isArray(data)) {

      throw TypeError('please transfer a array, thanks!');

    }

    let root = new Node(data[0]);

    data.length > 1 && this._setNodeRelationship(root, data);

    return root;

  }

  /**
   * @desc 设置节点关系
   *
   * @param {Node} root 顶节点
   * @param {Array} data 要生成二叉树的数据，data.length > 1
   *
   * @returns {void}
   */
  _setNodeRelationship(root, data) {

    for (let i = 1, dataLen = data.length; i < dataLen; i++) {

      this._insert(root, data[i]);

    }

  }

  /**
   * @desc 插入节点
   *
   * @param {Node} node 节点
   * @param {any} val 节点值
   *
   * @returns {void}
   */
  _insert(node, val) {

    if (node.val > val) {

      if (node.left === undefined) {

        node.left = new Node(val);

      }
      else {

        this._insert(node.left, val);

      }

    }
    else {

      if (node.right === undefined) {

        node.right = new Node(val);

      }
      else {

        this._insert(node.right, val);

      }

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
  static walk(root) {

    if (root.left === undefined && root.right === undefined) {

      return true;

    }
    else if ((root.left && root.right === undefined) ||
      (root.left === undefined && root.right) ||
      (root.val < root.left.val || root.val > root.right.val)
    ) {

      return false;

    }
    else {

      return Tree.walk(root.left) && Tree.walk(root.right);

    }

  }

  /**
   * @desc 不断递归左右节点，判断是否相等
   *
   * @param {Node} left 左节点
   * @param {Node} right 右节点
   *
   * @returns {Boolean}
   */
  static isBST(root) {

    return root instanceof Node && Tree.walk(root);

  }

}

export default (arr) => {

  // 参数判断
  if (!Array.isArray(arr)) {

    throw TypeError('please transfer a array, thanks!');

  }

  return Tree.isBST(new Tree(arr));

}