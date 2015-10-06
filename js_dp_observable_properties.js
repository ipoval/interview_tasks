#!/usr/bin/env node

/*
 * Observable properties DP
 * - good use case for adding validation callbacks and data formatting
 */

var Observable = function() {
  var observersChanging = [], // property change handlers
      observersChanged = [],
      property = '';

  Object.defineProperty(this, 'property', {
    get: function() {
      return property;
    },
    set: function(val) {
      if (val !== undefined && val !== property) {

        // Invoke property changing handlers
        for (var i = 0; i < observersChanging.length; ++i) {
          var observer = observersChanging[i];
          if (!observer(val)) {
            console.error('cancelled by observer validation');
            return val;
          }
        }

        property = val;

        // Invoke property changed handlers
        for (i = 0; i < observersChanged.length; ++i) {
          observer = observersChanged[i];
          observer(this);
        }
      }
      return val;
    }
  });

  this.onPropertyChanging = function(callback) {
    observersChanging.push(callback);
  };

  this.onPropertyChanged = function(callback) {
    observersChanged.push(callback);
  };
};

var observable = new Observable();

observable.onPropertyChanging(function(value) {
  if (value === 'bad') {
    console.error('validation error');
    return false;
  }
  return true;
});

observable.onPropertyChanged(function(observable) {
  console.info('changed', observable.property);
});

observable.property = 'good';
observable.property = 'bad';
