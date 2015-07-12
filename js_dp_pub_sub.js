/*
* Simple Pub-sub library with a simple message bus ability
*
* Usage:
* var pubsub = new PubSubPattern();
* pubsub.pub('add-to-cart', {});
* pubsub.pub('remove-from-cart', {});
*/
function PubSubPattern() {
  this.cache = {};

  this.pub = function(id) {
    var args = [].slice.call(arguments, 1);

    /* This allows the ability of message bus to store previous events and event arguments */
    if (!this.cache[id]) {
      this.cache[id] = {
        callbacks: [],
        args: [args]
      };
    }

    for (var i = 0, il = this.cache[id].callbacks.length; i < il; i++ ) {
      // null is passed as a function context
      // apply will allow to pass args as an array
      this.cache[id].callbacks[i].apply(null, args);
    }
  };

  this.sub = function(id, fn) {
    if (!this.cache[id]) {
      this.cache[id] = {
        callbacks: [fn],
        args: []
      };
    } else {
      this.cache[id].callbacks.push(fn);
    }

    // Go through the previous events that published before we had subscriber
    for (var i = 0, il = this.cache[id].args.length; i < il; i++) {
      fn.apply(null, this.cache[id].args[i]);
    }
  };

  this.unsub = function(id) {
    var index;
    if (!id) { return; }
    if (!fn) {
      this.cache[id] = {
        callbacks: [],
        args: []
      };
      return;
    }
    index = this.cache[id].callbacks.idexOf(fn);
    if (index > -1) {
      this.cache[id].callbacks.splice(index, 1);
    }
  };
}
