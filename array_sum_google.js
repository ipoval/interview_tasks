/**
 * Sum the digits of the arrays
 */

"use strict";

var array_sum = function(arr1, arr2) {
  var index1 = arr1.length - 1, index2 = arr2.length - 1, result = [];

  var next_from_arr1 = function() {
    return index1 >= 0 ? arr1[index1--] : 0;
  };
  var next_from_arr2 = function() {
    return index2 >= 0 ? arr2[index2--] : 0;
  };

  var to_add = 0;

  while(true) {
    var sum = next_from_arr1() + next_from_arr2() + to_add;
    to_add = 0;

    if (sum > 0) {
      if (sum > 9) {
        var sum_str = Number(sum).toString(),
            to_add = Number(sum_str.slice(0, -1)),
            last_digit = Number(sum_str.slice(-1));

        result.unshift(last_digit);
      } else {
        result.unshift(sum);
      }
    } else {
      break;
    }
  };

  return result;
};

array_sum([2, 3, 0], [3, 2, 1]); // => [5, 5, 1]
