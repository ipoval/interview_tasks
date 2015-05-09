/*
 * Input:           [1, 4, 7, 27, 80]
 * Expected Output: "0,2-3,5-6,8-26,28-79,81-99"
 */
function gapsSummary(input) {
  var sortedList = new Array(100);
  for ( var i = 0; i < 100; ++i ) { sortedList[i] = i; }

  var gap = [], /* 0 indx - leftBorder; 1 indx - rightBorder */
    gaps = [];

  sortedList.forEach(function(e) {
    if ( input.indexOf(e) === -1 ) {
      if ( gap.length === 0 ) {
        gap[0] = e;
      } else {
        gap[1] = e;
      }
    } else {
      if ( gap.length > 0 ) { gaps.push(gap); }
      gap = [];
    }
  });

  if ( gap.length > 0 ) { gaps.push(gap); }

  var output = "";
  gaps.forEach(function(gap) {
    if ( gap.length > 1 ) {
      output += gap.join('-');
    } else {
      output += gap[0];
    }
    output += ',';
  });

  output = output.replace(/,$/i, '');
  return output;
}

console.log(gapsSummary([1, 4, 7, 27, 80]));