const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this.rootNode = null
  }

  root(rootNode = this.rootNode) {
    return rootNode;
  }

  add(data) {
    const nodeNew = new Node(data);
    let curNode = this.rootNode;

    if (!curNode) {
      this.rootNode = nodeNew;
      return;
    }

    let isEnable = true;
    while (curNode && isEnable) {
      data > curNode.data ?
          !curNode.right ?
              (isEnable = false,
                      this._add(data, curNode, nodeNew)
              ) :
              curNode = curNode.right
           :
          !curNode.left ?
              (isEnable = false,
                  this._add(data, curNode, nodeNew)
              ) :
              curNode = curNode.left
    }
  }

  _add(data, curNode, nodeNew) {
    data > curNode.data ?
        curNode.right = nodeNew :
        curNode.left = nodeNew;
  }

  find(data, node= this.rootNode) {
    if (!node) return null;

    return data !== node.data ?
            data < node.data ?
               this.find(data, node.left) :
               this.find(data, node.right)
            : node;
  }

  has(data) {
    return !!this.find(data);
  }

  remove(node) {
    this.rootNode = this._remove(this.rootNode, node);
  }

  _remove(thisNode, data) {
    if (!thisNode) return null;

    if(thisNode.data !== data){
      return data < thisNode.data ?
          (thisNode.left = this._remove(thisNode.left, data),
              thisNode
          ) :
          (thisNode.right = this._remove(thisNode.right, data),
              thisNode
          )
    }

    return !thisNode.right || !thisNode.left ?
       (!thisNode.left && !thisNode.right ? null :
               (
                   !thisNode.left ?
                    thisNode.right :
                    thisNode.left
               )
       ) :
        (thisNode.data = this.getMin(thisNode.right).data,
         thisNode.right = this._remove(thisNode.right, thisNode.data),
         thisNode
        )
  }

  getMin(node = this.rootNode) {
    if (!node.left) return node;

    return this.getMin(node.left);
  }

  getMax(node = this.rootNode) {
    if (!node.right) return node;

    return this.getMax(node.right);
  }

  max() {
    return this.getMax().data
  }

  min() {
    return this.getMin().data
  }
}

class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

module.exports = {
  BinarySearchTree
};