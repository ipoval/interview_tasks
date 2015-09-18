/* PRBLM
 * Remove Nth node from the end of the linked list
 * 1 -> 2 -> 3 -> 4 -> 5; n = 2; => 1 -> 2 -> 3 -> 5
 *
 * A classical problem to use 2-pointers. One pointer moves
 * n steps first, and then 2 pointers move together.
 * When 1st pointer arrives tail, the 2nd pointer points
 * to node to delete.
 * Head node needs more attention.
 */

/* The "Runner" Technique */

var list = [1, 2, 3, 4, 5];

const HEAD = 0,
      N = 2;

var pointer1 = HEAD,
    pointer2 = HEAD;

for (var i = HEAD; i < N; ++i) {
  if ( list[i] ) {
    ++pointer1;
  }
}

/* we will go 1 step further than list.length */
/* dont use pointer1 < list.length so it looks more like real traversal of the list with next() */
while ( list[pointer1] ) {
  ++pointer1;
  ++pointer2;
}

list.splice(pointer2, 1);
/****************************************************************************************/

/* PRBLM
 * Delete a node in the middle of a singly linked list, given only access to that node.
 * example
 * input: the node c from the linked list a->b->c->d->e
 * result: nothing is returned, but the new linked list looks like a->b->d->e
 */
// If the node to be deleted is the last one, we can not remove it, but we could still mark it as "deleted"
function LinkedList(node) {
  this.head = node || new Node('head');
}

LinkedList.factoryLinkedList = function() {
  if (arguments.length === 0) { throw 'ArgumentError: provide at least 1 element for the list'; }

  function Node(data) {
    this.data = data;
    this.next = null;
  }

  var list = new LinkedList(new Node(arguments[0]));

  if (!arguments[1]) { return list; } // only 1 argument is provided

  var current = list.head;
  for (var i = 1; i < arguments.length; i++) {
    nextItem = new Node(arguments[i]);
    current.next = nextItem;
    current = current.next;
  }
  return list;
}

var ll = LinkedList.factoryLinkedList();

function deleteNodeInTheMiddle(ll, nodeInTheMiddleToDelete) {
  if (nodeInTheMiddleToDelete === null || nodeInTheMiddleToDelete.next === null) {
    return false; // ArgumentError
  }

  var curNode = nodeInTheMiddleToDelete,
    runner = curNode.next; // set a runner pointer which is 1 step ahead from deleting node

  while (runner.next !== null) {
    curNode.data = runner.data;
    curNode = curNode.next;
    runner = runner.next;
  }
  curNode.data = runner.data;
  curNode.next = null;

  return undefined;
}

deleteNodeInTheMiddle(ll, ll.head.next.next);

console.debug(ll);
/****************************************************************************************/

/* PRBLM
 * Merge two sorted lists using O(1) additional storage
 * input: l1->2->5-7; l2->3->11;
 * result: l3->2->3->5->7->11;
 */

function mergeLists(l1, l2) {
  var runner = l1.head, follower = l2.head;

  if (runner.data > follower.data) { // choose the head with the smallest value from 2 lists
    runner = l2.head;
    follower = l1.head;
  }

  var mergedList = runner;

  while (runner.next && follower) {
    if (runner.next.data > follower.data) {
      var fNext = follower.next;
      follower.next = runner.next;
      runner.next = follower;
      follower = fNext;
    }
    runner = runner.next;
  }

  if (follower) { runner.next = follower; } // add tail of the second list to the first list

  return mergedList;
}

var l1 = LinkedList.factoryLinkedList(2, 5, 7),
  l2 = LinkedList.factoryLinkedList(3, 11);

mergeLists(l1, l2);
