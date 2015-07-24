var PrefixTree = function() {
  this.children = {};
}

PrefixTree.prototype.addWord = function(word) {
  var addedLetters = [], current = null, letter = null;

  current = this;

  for ( var i = 0; i < word.length; i++ ) {
    letter = word[i];

    if ( Object.keys(current.children).length == 0 ) { // root
      current.children[letter] = new PrefixTree();
      addedLetters.push(letter);
      continue;
    }

    for ( var j = 0; j < addedLetters.length; j++ ) {
      current = current.children[addedLetters[j]];
    }

    if ( !current.children[letter] ) {
      current.children[letter] = new PrefixTree();
    }
    addedLetters.push(letter);
  }

  current.children[letter]['end'] = ''; // mark end of whole word
  return word;
}

var pt = new PrefixTree();
pt.addWord('test');

PrefixTree.prototype.getWords = function(prefix){
  /* Implement me! */
}

PrefixTree.prototype.removeWord = function(word){
  /* I'm extra credit! */
}
