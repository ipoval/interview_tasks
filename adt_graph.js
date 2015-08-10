function Vertex(label) {
  this.label = label;
}

/*
 * List of adjacent vertices
 */
function Graph(v) {
  this.vertices = v;
  this.nEdges = 0;
  this.adj = [];

  for (var i = 0; i < this.vertices; ++i) {
    this.adj[i] = [];
  }

  this.addEdge = function(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.nEdges++;
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

  this.visitedVertices = [];

  this.dfs = function(vertex) {
    this.visitedVertices[vertex] = true;
    console.info('dfs visited:', vertex);
    for (var i = 0; i < this.adj[vertex].length; i++) {
      if (!this.visitedVertices[this.adj[vertex][i]]) {
        this.dfs(this.adj[vertex][i]);
      }
    }
  };

  this.bfs = function(v) {
    var queueOfAdjacentVertices = [];
    this.visitedVertices = [];

    queueOfAdjacentVertices.push(v);

    while (queueOfAdjacentVertices.length) {
      var currentNode = queueOfAdjacentVertices.shift();
      if (this.visitedVertices.indexOf(currentNode) === -1) {
        this.visitedVertices.push(currentNode);
        console.info('bfs visited:', currentNode);
        this.adj[currentNode].forEach(function(adjVertex) {
          queueOfAdjacentVertices.push(adjVertex);
        });
      }
    }
  };

}

var g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);
g.showGraph();

/*
 * Given a directed graph, design an algorithm to find out whether there is a route between two nodes.
 */
