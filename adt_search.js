/* Searching Algorithms */

function seqSearch(arr, data) {
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] == data) {
      return i;
    }
  }
  return -1;
}

function findMin(arr) {
  var min = arr[0];
  for (var i = 1; i < arr.length; ++i) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}

function findMax(arr) {
  var max = arr[0];
  for (var i = 1; i < arr.length; ++i) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

/* Binary Search */

function selectionSort(array) {
  var sortedArray = array.slice(0); // copy by value

  for (var i = 0; i < sortedArray.length - 1; ++i) {
    for (var j = i + 1; j < sortedArray.length; ++j) {
      if (sortedArray[j] < sortedArray[i]) {
        var tmp = sortedArray[i];
        sortedArray[i] = sortedArray[j];
        sortedArray[j] = tmp;
      }
    }
  }
  return sortedArray;
}

var nums = [];

function setup() {
  for (var i = 0; i < 100; ++i) {
    var rand = Math.floor(Math.random() * 101);
    nums[i] = rand;
  }
}
setup();

var sortedArray = selectionSort(nums);

console.table(sortedArray);

function binarySearch(array, data) {
  var lowerIdx = 0, upperIdx = array.length - 1;

  while ( lowerIdx <= upperIdx ) {
    var medianIdx = Math.floor( (upperIdx + lowerIdx) / 2 ),
      median = array[medianIdx];

    if ( median > data ) {
      upperIdx = medianIdx - 1;
    } else if ( median < data ) {
      lowerIdx = medianIdx + 1;
    } else {
      return medianIdx;
    }
  }

  return -1;
}

// find index of number 74 with binary search
// binarySearch(sortedArray, 74)
