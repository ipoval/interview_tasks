'#!/usr/bin/env node';

/* work around to load this file in 2 environments: node.js and web-browser */
window = this;

(function(global) {

'use strict';

/*
 * ADT (Abstract Data Type) LINKED LIST implemented based on object references
 *
 * @author: @ipoval
 * @run:    node -p 'require("./adt_linked_list");'
 */
function Node(data) {
  this.data = data;
  this.next = null;
  this.previous = null; /* for Doubly Linked List only */
}

function LinkedList() {
  this.head = new Node('head');
  // this.head.next = this.head; /* for Circularly Linked List only */
}

LinkedList.prototype = {
  toString: function() {
    var currNode = this.head;
    while ( currNode.next !== null ) {
      console.info(currNode.next.data);
      currNode = currNode.next;
    }
  },

  find: function(data) {
    var curNode = this.head;
    do {
      if (curNode.data === data) {
        return curNode
      }
    } while ( curNode.next )
  },

  insert: function(data, afterNodeWithData) {
    var afterNode = this.find(afterNodeWithData);
    if ( !afterNode ) { return; }
    var newNode = new Node(data);
    newNode.next = afterNode.next;
    afterNode.next = newNode;
  },

  insertToEnd: function(data) {
    var endNode = this.head;
    while (endNode.next !== null) {
      endNode = endNode.next;
    }
    endNode.next = new Node(data);
    return this; // support for chaining DP: ll.insertToEnd(10).insertToEnd(20);
    // TODO: more work if it's a circular LL
    // TODO: more work if it's a doubly LL
  },

  findPrevious: function(item) {
    var currNode = this.head;
    while ( (currNode.next !== null) && (currNode.next.element !== item) ) {
      currNode = currNode.next;
    }
    return currNode;
  },

  remove: function(item) {
    if (this.head.data === item) {
      var next = this.head.next;
      delete this.head;
      this.head = next;
      return;
    }

    var prevNode = this.findPrevious(item);
    if ( prevNode.next !== null ) {
      prevNode.next = prevNode.next.next;
    }
  },

  findLast: function() {
    var currNode = this.head;
    while ( currNode.next !== null ) {
      currNode = currNode.next;
    }
    return currNode;
  },

  /* for doubly linked lists only */
  dispReverse: function() {
    var currNode = this.head;
    currNode = this.findLast();
    while ( currNode.previous !== null ) {
      console.info(currNode.element);
      currNode = currNode.previous;
    }
  }

  /* TODO: API to implement advance(n), back(n), show() */
};

global.adt_LinkedList = LinkedList;

})(window);

/*
 * __END__
 */

if ( typeof(require) !== 'undefined' && require.main == module ) {
  console.error('Invoked at command line.');
  var symbols = process.argv;
  console.dir(symbols);
  console.info("\n");

  var linked_list = new window.adt_LinkedList();

} else {
  console.error('adt_linked_list.js: invoked via library call');
}
