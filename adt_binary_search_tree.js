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

/*
 * __END__
 */

var bst = new BST();
bst.insert(30);
bst.insert(20);
bst.insert(50);
bst.insert(60);
