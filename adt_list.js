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
  this.listSize = this.pos = 0;
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
  this.pos = 0;
}

function end() {
  this.pos = this.listSize - 1;
}

function prev() {
  if ( this.pos > 0 ) {
    --this.pos;
  }
}

function next() {
  if ( this.pos < this.listSize - 1 ) {
    ++this.pos;
  }
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

function contains(element) {
  return this.find(element) > -1;
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

  var listOfNames = new List();

  listOfNames.append('ivan').append('roman').append('vasya');
  console.dir(listOfNames);
  console.info("\n");
  console.info(listOfNames.toString());

  listOfNames.insert('john', 'roman');
  console.info(listOfNames.toString());

  listOfNames.remove('roman')
  console.info(listOfNames.toString());

} else {
  console.error('Invoked via library call');
}
