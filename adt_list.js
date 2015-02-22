'#!/usr/bin/env node';

'use strict';

/*
 * @ipoval
 * ADT (Abstract Data Type) LIST
 *   implemented based on array
 *
 * Launch with node -p 'require("./adt_list");'
 */
function List() {
  this.listSize   = 0;
  this.position     = 0;
  this.dataStore  = []; // initialize array to store list elements
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

function append(element) {
  this.dataStore[this.listSize++] = element;
  return this;
}

function find(element) {
  for (var i in this.dataStore) {
    if (this.dataStore[i] === element) {
      return parseInt(i);
    }
  }
  return -1;
}

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

function prev() {
  if ( this.position > 0 ) {
    --this.position;
  }
}

function next() {
  if ( this.position < this.listSize - 1 ) {
    ++this.position;
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

/*
 * __END__
 */

if ( typeof(require) !== 'undefined' && require.main == module ) {
  console.error('Invoked at command line.');
  var symbols = process.argv;
  console.dir(symbols);
  console.info("\n");

  var listOfNames = new List();

  listOfNames.append('ivan').append('roman').append('vasya');
  console.dir(listOfNames);
  console.info("\n");
  console.info(listOfNames.toString());

  listOfNames.insert('john', 'roman');
  console.info(listOfNames.toString());

  listOfNames.remove('roman');
  console.info(listOfNames.toString());

  console.info(listOfNames.listSize);

} else {
  console.error('adt_list.js: invoked via library call');
}
