/*
 * Remove Nth node from the end of the linked list
 * 1 -> 2 -> 3 -> 4 -> 5; n = 2; => 1 -> 2 -> 3 -> 5
 *
 * A classical problem to use 2-pointers. One pointer moves
 * n steps first, and then 2 pointers move together.
 * When 1st pointer arrives tail, the 2nd pointer points
 * to node to delete.
 * Head node needs more attention.
 */

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
/* dont use pointer1 < list.length so it looks more like realy traversal of the list with next() references */
while ( list[pointer1] ) {
  ++pointer1;
  ++pointer2;
}

list.splice(pointer2, 1);
