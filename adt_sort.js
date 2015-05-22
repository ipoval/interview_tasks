/* Sorting algorithms */

function quickSort(array) {
  // var pivot = Math.floor(Math.random() * array.length);
  var pivot = array[0], ltArray = [], gtArray = [];

  if (array.length == 0) { return []; }
  if (array.length == 1) { return pivot; }

  for (var i = 1; i < array.length; ++i) {
    if ( pivot <= array[i] ) {
      gtArray.push(array[i]);
    } else {
      ltArray.push(array[i]);
    }
  }

  return quickSort(ltArray).concat(pivot, quickSort(gtArray));
}

// quickSort([3,4,5,6,1]);
