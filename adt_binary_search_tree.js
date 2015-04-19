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
    console.info(this.root);
  },
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

// bst.traverse.inOrder();
//
// console.log(Array(30).join('-'));
//
// bst.traverse.preOrder();
//
// console.log(Array(30).join('-'));
//
// bst.traverse.postOrder();
