function Vertex(label) {
  this.label = label;
}

/*
 * List of adjacent vertices
 */
function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adj = [];

  for (var i = 0; i < this.vertices; ++i) {
    this.adj[i] = [];
    this.adj[i].push("");
  }

  this.addEdge = function(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
  };

  this.showGraph = function() {
    for (var i = 0; i < this.vertices; ++i) {
      var strOut = i.toString() + ' ->';

      for (var j = 0; j < this.vertices; ++j) {
        if (this.adj[i][j] != undefined) {
          strOut += this.adj[i][j] + ' ';
        }
      }

      console.info(strOut);
    }
  };

  this.depthFirstSearch = function() {
    for (var i = 0; i < this.vertices; ++i) {
      
    }
  };
}

var g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.showGraph();
