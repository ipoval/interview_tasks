'#!/usr/bin/env node';

/*
 * ADT (Abstract Data Type) QUEUE implemented based on array
 *
 * @author: @ipoval
 * @run:    node -p 'require("./adt_queue");'
 *
 * allow to load this script in 2 environments: node.js and web-browser
 * http://localhost:8081/adt_queue.js
 */
window = this;

(function(global) {

'use strict';

function Queue() {
  this.dataStore = []; /* initialize array to store queue elements */
  this.queueSize = 0;
  this.enqueue   = enqueue;
  this.dequeue   = dequeue;
  this.front     = front;
  this.back      = back;
  this.clear     = clear;
  this.toString  = toString;
}

Queue.prototype = {
  /* accessor @length: queueInstance.length */
  get length() {
    return this.queueSize;
  },
  set length(val) {
    this.queueSize = val;
  }
};

function enqueue(item) {
  this.dataStore.push(item);
  return this;
}

function dequeue() {
  return this.dataStore.shift();
}

function front() {
  return this.dataStore[0];
}

function back() {
  return this.dataStore[this.dataStore.length - 1];
}

function toString() {
  return this.dataStore.join("\n");
}

function clear() {
  delete this.dataStore;
  this.dataStore = [];
  this.queueSize = this.position = 0;
}

global.adt_Queue = Queue;

})(window);

/*
 * __END__
 */

if ( typeof(require) !== 'undefined' && require.main == module ) {
  console.error('Invoked at command line.');
  var symbols = process.argv;
  console.dir(symbols);
  console.info("\n");

  var queue = new window.adt_Queue();

  queue.enqueue('ivan').enqueue('roman').enqueue('vasya');
  console.dir(queue);
  console.info("\n");
  queue.dequeue();
  console.info(queue.toString());

} else {
  console.error('adt_queue.js: invoked via library call');
}

/* Queue implemented as singly linked list
class Queue {
  Node first, last;

  void enqueue(0bject item) {
    if (first == null) {
      last = new Node(item);
      first = last;
    } else {
      last.next = new Node(item);
      last = last.next;
    }
  }

  Object dequeueQ {
    if (first != null) {
      Object item = first.data;
      first = first.next;
      return item;
    }
    return null;
  }
}
*/
