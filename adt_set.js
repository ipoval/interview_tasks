'#!/usr/bin/env node';

/*
 * ADT (Abstract Data Type) SET implemented based on array
 *
 * @author: @ipoval
 * @run:    node -p 'require("./adt_set");'
 *
 * allow to load this script in 2 environments: node.js and web-browser
 * http://localhost:8081/adt_set.js
 */
window = this;

(function(global) {

'use strict';

function Set() {
  this.dataStore = [];
  this.add = add;
  this.remove = remove;
  this.size = size;
  this.union = union;
  this.intersect = intersect;
  this.subset = subset;
  this.difference = difference;
  this.show = show;
}

function add(data) {
  if (this.dataStore.indexOf(data) < 0) {
    this.dataStore.push(data);
    return true;
  }
  else {
    return false;
  }
}

function remove(data) {
  var pos = this.dataStore.indexOf(data);
  if (pos > -1) {
    this.dataStore.splice(pos, 1);
    return true;
  }
  else {
    return false;
  }
}

function show() {
  return this.dataStore;
}

function contains(data) {
  return this.dataStore.indexOf(data) > -1;
}

function difference(set) {
  var tempSet = new Set();
  for (var i = 0; i < this.dataStore.length; ++i) {
    if (!set.contains(this.dataStore[i])) {
      tempSet.add(this.dataStore[i]);
    }
  }
  return tempSet;
}

function size() {
  return this.dataStore.length;
}

function subset(set) {
  if (this.size() > set.size()) {
    return false;
  }
  else {
    foreach (var member in this.dataStore) {
      if (!set.contains(member)) {
        return false;
      }
    }
  }
  return true;
}

function intersect(set) {
  var tempSet = new Set();
  for (var i = 0; i < this.dataStore.length; ++i) {
    if (set.contains(this.dataStore[i])) {
      tempSet.add(this.dataStore[i]);
    }
  }
  return tempSet;
}

function union(set) {
  var tempSet = new Set();
  for (var i = 0; i < this.dataStore.length; ++i) {
    tempSet.add(this.dataStore[i]);
  }
  for (var i = 0; i < set.dataStore.length; ++i) {
    if (!tempSet.contains(set.dataStore[i])) {
      tempSet.dataStore.push(set.dataStore[i]);
    }
  }
  return tempSet;
}

global.adt_Set = Set;

})(window);

/*
 * __END__
 */
