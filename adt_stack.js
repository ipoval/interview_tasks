'#!/usr/bin/env node';

/* work around to load this file in 2 environments: node.js and web-browser */
window = this;

(function(global) {

'use strict';

/*
 * ADT (Abstract Data Type) STACK implemented based on array
 *
 * @author: @ipoval
 * @run:    node -p 'require("./adt_stack");'
 */
function Stack() {
  this.dataStore = [];
  this.top       = 0;
}

Stack.prototype = {
  /* accessor @length: stackInstance.length */
  get length() {
    return this.top;
  },
  set length(val) {
    this.top = val;
  },
};

Stack.prototype.push = function(element) {
  this.dataStore[this.top++] = element;
  return this;
};

Stack.prototype.pop = function(element) {
  return this.dataStore[--this.top];
};

Stack.prototype.peek = function() {
  return this.dataStore[this.top - 1];
};

Stack.prototype.clear = function() {
  this.top = 0;
};

global.adt_Stack = Stack;

})(window);

/*
 * __END__
 */

/*
 * MULTIPLE BASE CONVERSION ALTORITHM BASED ON STACK
 * converts bases 2..9
 */
function multiBaseConvert(numberBase10, convertToBase) {
  var d = numberBase10, stack = new adt_Stack(), result = '';

  do {
    stack.push(d % convertToBase);
    d = Math.floor(d / convertToBase);
  } while (d > convertToBase);
  stack.push(d);

  while ( stack.length ) {
    result += stack.pop().toString();
  }

  return result;
}

function isPalindrome(str) {
  var reversedStr = '', char = '', stack = new adt_Stack();

  for (var i = 0; i < str.length; ++i) {
    stack.push(str[i]);
  }

  while(char = stack.pop()) {
    reversedString += char;
  }

  return str == reversedStr;
}

if ( typeof(require) !== 'undefined' && require.main == module ) {
  console.error('Invoked at command line.');
  var symbols = process.argv;
  console.dir(symbols);
  console.info("\n");

  var stack = new window.adt_Stack();

  stack.push(3).push(2).push(1);
  console.dir(stack);

} else {
  console.error('adt_stack.js: invoked via library call');
}
