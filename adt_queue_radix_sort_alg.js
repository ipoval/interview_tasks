// http://en.wikipedia.org/wiki/Radix_sort
// non-comparative integer sorting algorithm
// O(dn) -> O(nlog(n)), d - number of digits

Array.randomNums = function(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * 100);
  }
  return arr;
};

var unsorted = Array.randomNums(100);

function radixSort(arr) {
  var queues = [],
    sortedQueues = [],
  len = arr.length;

  for (var i = 0; i < len; ++i) {
    var n = arr[i],
      queueN = n % 10;
    queues[queueN] = queues[queueN] || [];
    queues[queueN].push(n);
  }

  queues.forEach(function(queue) {
    var n;

    while ( n = queue.shift() ) {
      var queueN = parseInt(n / 10);
      sortedQueues[queueN] = sortedQueues[queueN] || [];
      sortedQueues[queueN].push(n);
    }
  });

  return [].concat.apply([], sortedQueues); // .flatten;
}

console.dir(radixSort(unsorted));

// => Array[10] 0: 16; 1: 21; 2: 27; 3: 31; 4: 41; 5: 45; 6: 51; 7: 70; 8: 72; 9: 93; length: 10__proto__: Array[0]
