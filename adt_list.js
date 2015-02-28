'#!/usr/bin/env node';

window = this;

(function(global) {

'use strict';

/*
 * ADT (Abstract Data Type) LIST implemented based on array
 *
 * @author: @ipoval
 * @run:    node -p 'require("./adt_list");'
 */
function List() {
  this.dataStore  = []; /* initialize array to store list elements */
  this.listSize   = 0;
  this.position   = 0;
  this.clear      = clear;
  this.find       = find;
  this.toString   = toString;
  this.insert     = insert;
  this.append     = append;
  this.remove     = remove;
  this.front      = front;
  this.end        = end;
  this.prev       = prev;
  this.next       = next;
  this.moveTo     = moveTo;
  this.getElement = getElement;
  this.contains   = contains;
}

List.prototype = {
  /* accessor @length: listInstance.length */
  get length() {
    return this.listSize;
  },
  set length(val) {
    this.listSize = val;
  },
};

List.prototype.append = function(element) {
  this.dataStore[this.listSize++] = element;
  return this;
};

List.prototype.find = function(element) {
  for (var i in this.dataStore) {
    if (this.dataStore[i] === element) {
      return parseInt(i);
    }
  }
  return -1;
};

function remove(element) {
  var foundAt = this.find(element);
  if ( foundAt > -1 ) {
    this.dataStore.splice(foundAt, 1);
    --this.listSize;
    return true;
  }
  return false;
}

function toString() {
  return this.dataStore;
}

function clear() {
  delete this.dataStore;
  this.dataStore = [];
  this.listSize = this.position = 0;
}

function insert(element, afterElement) {
  var afterIdx = this.find(afterElement);
  if ( afterIdx > -1 ) {
    this.dataStore.splice(afterIdx + 1, 0, element);
    ++this.listSize;
    return true;
  }
  return false;
}

function front() {
  this.position = 0;
}

function end() {
  this.position = this.listSize - 1;
}

function next() {
  if ( this.position < this.length ) {
    ++this.position;
  }
}

function prev() {
  if ( this.position >= 0 ) {
    --this.position;
  }
}

function moveTo(newPosition) {
  this.position = newPosition;
}

function getElement() {
  return this.dataStore[this.position];
}

function contains(element) {
  return this.find(element) > -1;
}

global.adt_List = List;

})(window);

/*
 * __END__
 */

if ( typeof(require) !== 'undefined' && require.main == module ) {
  console.error('Invoked at command line.');
  var symbols = process.argv;
  console.dir(symbols);
  console.info("\n");

  var list = new window.adt_List();

  list.append('ivan').append('roman').append('vasya');
  console.dir(list);
  console.info("\n");
  list.insert('john', 'roman');
  list.remove('roman');
  console.info(list.toString());

  /*
   * Iterator
   */
  for ( list.front(); list.position < list.length; list.next() ) {
    console.log('Iterator: ', list.getElement(), list.position);
  }
  for ( list.end(); list.position >= 0; list.prev() ) {
    console.log('Iterator Reverse: ', list.getElement(), list.position);
  }

} else {
  console.error('adt_list.js: invoked via library call');
}
