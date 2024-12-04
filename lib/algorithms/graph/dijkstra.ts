export const dijkstra = {
  id: "dijkstra",
  name: "Dijkstra's Algorithm",
  category: "graph" as const,
  description: "Finds the shortest path between nodes in a weighted graph, which may represent, for example, road networks.",
  complexity: {
    time: "O((V + E) log V)",
    space: "O(V)"
  },
  defaultCode: `function dijkstra(graph, start) {
  const distances = {};
  const previous = {};
  const nodes = new Set();
  
  // Initialize distances
  for (let vertex in graph) {
    if (vertex === start) {
      distances[vertex] = 0;
    } else {
      distances[vertex] = Infinity;
    }
    previous[vertex] = null;
    nodes.add(vertex);
  }
  
  while (nodes.size > 0) {
    let minNode = null;
    for (let node of nodes) {
      if (!minNode || distances[node] < distances[minNode]) {
        minNode = node;
      }
    }
    
    nodes.delete(minNode);
    
    for (let neighbor in graph[minNode]) {
      let alt = distances[minNode] + graph[minNode][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = minNode;
      }
    }
  }
  
  return { distances, previous };
}`
};
