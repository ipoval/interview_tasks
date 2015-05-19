var PrefixTree = function() {
  this.children = {};
}

PrefixTree.prototype.addWord = function(word) {
  var addedLetters = [];
  var current = null;

  for ( var i = 0; i < word.length; i++ ) {
    var letter = word[i];

    if ( Object.keys(this.children).length == 0 ) {
      // root
      this.children[letter] = new PrefixTree();
      addedLetters.push(letter);
      continue;
    }

    current = this;
    for ( var j = 0; j < addedLetters.length; j++ ) {
      var l = addedLetters[j];
      current = current.children[l];
    }

    if ( !current.children[letter] ) {
      current.children[letter] = new PrefixTree();
    }
    addedLetters.push(letter);
  }

  current.children['end'] = '';

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
