function HashTable() {
  this.table = new Array(137); /* bins size is Prime number - important */
  this.simpleHash = simpleHash;
  this.hornerHash = hornerHash;
  this.showDistro = showDistro;
  this.put = put;
  //this.get = get;
}

/* hash for string keys */
function simpleHash(data) {
  var total = 0;
  for (var i = 0; i < data.length; ++i) {
    total += data.charCodeAt(i);
  }
  return total % this.table.length;
}

/* hash for string keys */
function hornerHash(data) {
  const H = 37;
  var total = 0;

  for (var i = 0; i < data.length; ++i) {
    total += H * total * data.charCodeAt(i);
  }

  total = total % this.table.length;

  if (total < 0) {
    total += this.table.length - 1;
  }

  return parseInt(total);
}

function put(data) {
  var pos = this.simpleHash(data);
  this.table[pos] = data;
}

function showDistro() {
  var len = this.table.length;
  for (var i = 0; i < len; ++i) {
    if (this.table[i] !== undefined) {
      console.info(i, ': ', this.table[i]);
    }
  }
}

var someNames = ["David", "Jennifer", "Donnie", "Raymond", "Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
var hTable = new HashTable();

for (var i = 0; i < someNames.length; ++i) {
  hTable.put(someNames[i]);
}
hTable.showDistro();
