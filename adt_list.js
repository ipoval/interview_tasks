#!/usr/bin/env node

/*
 * @ipoval
 * ADT (Abstract Data Type) LIST
 *   implemented based on array
 *
 * Launch with node -p 'require("./adt_list");'
 */
function List() {
  this.listSize   = 0;
  this.pos        = 0;
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
  this.length     = length;
  this.currPos    = currPos;
  this.moveTo     = moveTo;
  this.getElement = getElement;
  this.length     = length;
  this.contains   = contains;
}

function append(element) {
  this.dataStore[this.listSize++] = element;
  return this;
}

function find(element) {
  for (var i in this.dataStore) {
    if (this.dataStore[i] === element) {
      return i;
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

}

function insert() {

}

function front() {

}

function end() {

}

function prev() {

}

function next() {

}

function length() {
  return this.listSize;
}

function currPos() {

}

function moveTo() {

}

function getElement() {

}

function contains() {

}

function listSize() {

}

/*
 * __END__
 */

if ( require.main == module ) {
  console.error('Invoked at command line.');
  var symbols = process.argv;
  console.dir(symbols);
  console.info("\n");

  var list = new List();
  list.append('element0').append('element1');
  console.dir(list);
  console.info("\n");
  console.info(list.toString());
} else {
  console.error('Invoked via library call');
}
