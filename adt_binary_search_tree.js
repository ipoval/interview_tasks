function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.show = function() {
    return this.data;
  };
}

function BST() {
  this.root = null;
  this.currentNode = this.root;

  this.insert = function insert(data) {
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
  };
}

BST.prototype = {
  get current() { return this.currentNode; },
  set current(_currentNode) { this.currentNode = _currentNode; },

  reachedLeftLeaf: function() {
    return this.current.left === null;
  },
  reachedRightLeaf: function() {
    return this.current.right === null;
  },

  get traverse() { return this; },

  inOrder: function() {
    var parent = this.root;

    function trav(node) {
      if (node !== null) {
        trav(node.left);
        console.log(node.data);
        trav(node.right);
      }
    };

    trav(parent);
  },

  preOrder: function() {
    var parent = this.root;

    function trav(node) {
      if (node !== null) {
        console.log(node.data);
        trav(node.left);
        trav(node.right);
      }
    };

    trav(parent);
  },

  postOrder: function() {
    var parent = this.root;

    function trav(node) {
      if (node !== null) {
        trav(node.left);
        trav(node.right);
        console.log(node.data);
      }
    };

    trav(parent);
  },

  get search() { return this; },

  min: function() {
    this.current = this.root;
    while ( !this.reachedLeftLeaf() ) {
      this.current = this.current.left;
    }
    return this.current.data;
  },

  max: function() {
    this.current = this.root;
    while ( !this.reachedRightLeaf() ) {
      this.current = this.current.right;
    }
    return this.current.data;
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

/* BST Traversal */
bst.traverse.inOrder();
console.log(Array(30).join('-'));
bst.traverse.preOrder();
console.log(Array(30).join('-'));
bst.traverse.postOrder();
console.log(Array(30).join('-'));

/* BST Search */
console.log(bst.search.min());
console.log(Array(30).join('-'));
console.log(bst.search.max());
console.log(Array(30).join('-'));
