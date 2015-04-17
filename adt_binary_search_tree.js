function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.show = show;
}

function show() {
  return this.data;
}

function BST() {
  this.root = null;
  this.insert = insert;
}

function insert(data) {
  var newNode = new Node(data, null, null);

  if ( this.root === null ) {
    this.root = newNode;
    return;
  }

  var parent, current = this.root;

  while (true) {
    parent = current;

    if (data < current.data) {
      current = current.left;
      if (current === null) {
        parent.left = newNode;
        break;
      }
    } else {
      current = current.right;
      if (current === null) {
        parent.right = newNode;
        break;
      }
    }
  }
}

BST.prototype = {
  traverseInOrder: function() {
    var parent = this.root;

    function traverse(node) {
      if (node !== null) {
        traverse(node.left);
        console.log(node.data);
        traverse(node.right);
      }
    };

    traverse(parent);
  },

  traversePreOrder: function() {
    var parent = this.root;

    function traverse(node) {
      if (node !== null) {
        console.log(node.data);
        traverse(node.left);
        traverse(node.right);
      }
    };

    traverse(parent);
  },

  traversePostOrder: function() {
    var parent = this.root;

    function traverse(node) {
      if (node !== null) {
        traverse(node.left);
        traverse(node.right);
        console.log(node.data);
      }
    };

    traverse(parent);
  }
}

/*
 * __END__
 */

var bst = new BST();
bst.insert(23);
bst.insert(45);
bst.insert(16);
bst.insert(37);
bst.insert(3);
bst.insert(99);
bst.insert(22);

bst.traverseInOrder();

console.log(Array(30).join('-'));

bst.traversePreOrder();

console.log(Array(30).join('-'));

bst.traversePostOrder();
