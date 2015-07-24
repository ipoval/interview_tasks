/***********************/
/* Dynamic Programming */
/***********************/

/****************************/
/* Longest Common Substring */
/****************************/
function lcs(str1, str2) {
  var m = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  for ( var i = 0; i < str1.length; ++i ) {
    var l1 = str1[i];
    for ( var j = 0; j < str2.length; ++j ) {
      var l2 = str2[j];
      m[i][j] = l1 === l2 ? 1 : 0;
    }
  }

  var matches = [];

  for ( var i = 0; i < m.length; ++i ) {
    for ( var j = 0; j < m[i].length; ++j ) {
      var bit = m[i][j];

      if ( bit === 1 ) {
        var startOfMatchIdx = [i, j];
        var endOfMatchIdx = [i, j];

        while ( m[endOfMatchIdx[0] + 1] &&  m[endOfMatchIdx[0] + 1][endOfMatchIdx[1] + 1] === 1 ) {
          endOfMatchIdx[0] += 1;
          endOfMatchIdx[1] += 1;
        }

        matches.push([ startOfMatchIdx, endOfMatchIdx]);
      }

    }

  }

  return matches;
}

var str = lcs(['d', 'b', 'b', 'c', 'c'], ['a', 'b', 'b', 'c', 'c']);
console.info(str);

/********************/
/* Knapsack problem */
/********************/
var prices = [4, 5, 10, 11, 13];
var volumes = [3, 4, 7, 8, 9];
var cap = 16;
var n = 5;

function knapsack(p, v, cap, n) {
  if (n == 0 || cap <= 0) { return 0; }
  if ( v[n] > cap ) { return knapsack(p, v, cap, n - 1); }

  return Math.max(p[n] + knapsack(p, v, cap - v[n], n - 1),
                  knapsack(p, v, cap, n - 1));
}

knapsack(prices, volumes, cap, n - 1);
