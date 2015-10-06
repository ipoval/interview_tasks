#!/usr/bin/env node

/*
 * Callback object DP
 * - good use case for callbacks on async AJAX requests
 */

var callbackObject = {
  someValue: 20,

  loadData: function(data) {
    var sum = this.someValue + data;
    console.info('Loaded data in after callback:', sum);
  },

  prepareRequest: function() {
    ajaxRequest('http://example.com', this.loadData.bind(this));
  }
};

var ajaxRequest = function(url, callback) {
  // make the request with the provided url
  var data = 10; // json, text, or html returnted as a server response
  callback(data);
};

callbackObject.prepareRequest();
