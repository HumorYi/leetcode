/*
  101. 对称二叉树

  给定一个二叉树，检查它是否是镜像对称的。

  例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

       1
      / \
     2   2
    / \  / \
    3  4 4  3

  但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

     1
    / \
    2   2
    \   \
    3    3

  说明: 如果你可以运用递归和迭代两种方法解决这个问题，会很加分。
*/

/*
  解题思路：
    0、参数判断：
    1、js并没有二叉树数据结构，标准的二叉树有一个顶节点，顶节点下面的每个节点都有左右子节点
    2、通过类来创建节点，第一个元素为顶节点，接着为顶节点的左右子节点，如此反复，通过指向来建立连接，形成二叉树
    3、使用数组来存储节点值，遍历数组，为每个元素创建节点，节点值为元素值，使用临时节点数组来存储每个节点，便于计算父子节点的关系
    4、要想建立节点之间的关系，必须要分析并查找规律
    5、从第0层开始，每一层有2^n个元素
    6、先分析当前节点属于哪一层
      nodeCurrLevel = Math.sqrt(i+1)
    7、再分析当前层的开始元素下标
      nodeCurrLevelStartIndex = Math.pow(2, nodeCurrLevel) - 1
    8、再分析当前层的上一层开始元素下标，
      nodeCurrPrevLevelStartIndex = Math.pow(2, nodeCurrLevel - 1) - 1
    9、再分析当前节点的父节点下标
      parentNodeIndex = nodeCurrPrevLevelStartIndex + Math.floor( (i - nodeCurrLevelStartIndex) / 2 )
    10、得到父节点
      parentNode = nodeList[parentNodeList]
    11、得到父节点之后，为父节点指定左右节点，先左后右，指定当前节点的位置

    12、镜像二叉树的判断条件是：
      1、顶节点的左右节点数值相等，
      2、左节点的左节点 与 右节点的右节点 数值相等，左节点的右节点 与 右节点的左节点 数值相等，
      3、如此反复比较，如果到最后左节点没有左右节点，右节点没有左右节点，则意味着二叉树比较结束，所有的左右节点数值均相等，即是一个镜像二叉树，除此之外，均不是镜像二叉树。
    13、从上可知，明显是一个递归操作

  注意:
    第0层为顶点，无需计算
*/

/**
 * @desc 二叉树节点
 */
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

    // 顶节点
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

    // 存储临时所有节点，方便寻找父子节点和计算节点层级
    let nodeList = [root];

    for (let i = 1, dataLen = data.length; i < dataLen; i++) {

      let node = new Node(data[i]),
        parentNode = this._getParentNode(nodeList, i)
        ;

      nodeList.push(node);

      if (parentNode.left) {

        parentNode.right = node;

      }
      else {

        parentNode.left = node;

      }

    }

    nodeList = null;

  }

  /**
   * @desc 获取父节点
   *
   * @param {Array} nodeList
   * @param {Number} i 当前节点下标
   *
   * @returns {Node} 父节点
   */
  _getParentNode(nodeList, i) {

    let nodeCurrLevel = Math.floor(Math.sqrt(i + 1)),
      nodeCurrLevelStartIndex = Math.pow(2, nodeCurrLevel) - 1,
      nodePrevLevelStartIndex = Math.pow(2, nodeCurrLevel - 1) - 1,
      parentNodeIndex = nodePrevLevelStartIndex + Math.floor((i - nodeCurrLevelStartIndex) / 2);

    return nodeList[parentNodeIndex]

  }

  /**
   * @desc 不断递归左右节点，判断是否相等
   *
   * @param {Node} left 左节点
   * @param {Node} right 右节点
   *
   * @returns {Boolean}
   */
  static walk(left, right) {

    if (left === undefined && right === undefined) {

      return true;

    }

    if ((left && right === undefined) ||
      (left === undefined && right) ||
      (left.val !== right.val)
    ) {

      return false;

    }

    return Tree.walk(left.left, right.right) && Tree.walk(left.right, right.left);

  }

  /**
   * @desc 是否镜像二叉树
   *
   * @param {Node} root 顶节点
   *
   * @returns {Boolean}
   */
  static isSymmetry(root) {

    return root instanceof Node && Tree.walk(root.left, root.right);

  }

}

export default (arr) => {

  // 参数判断
  if (!Array.isArray(arr)) {

    throw TypeError('please transfer a array, thanks!');

  }

  return Tree.isSymmetry(new Tree(arr));

}