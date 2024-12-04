export const aStar = {
  id: "a-star",
  name: "A* Pathfinding",
  category: "grid" as const,
  description: "A* is a graph traversal and path search algorithm that finds the shortest path between points. It uses heuristics to guide its search and is more efficient than Dijkstra's algorithm for most cases.",
  complexity: {
    time: "O(E log V)",
    space: "O(V)"
  },
  defaultCode: `function aStar(grid, start, end) {
  const rows = grid.length;
  const cols = grid[0].length;
  
  // Priority queue for open nodes
  const openSet = new Set([start]);
  const cameFrom = new Map();
  
  // Cost from start to node
  const gScore = new Map();
  gScore.set(nodeToString(start), 0);
  
  // Estimated total cost from start to end through node
  const fScore = new Map();
  fScore.set(nodeToString(start), heuristic(start, end));
  
  while (openSet.size > 0) {
    const current = getLowestFScore(openSet, fScore);
    
    if (current[0] === end[0] && current[1] === end[1]) {
      return reconstructPath(cameFrom, current);
    }
    
    openSet.delete(current);
    
    // Check all neighbors
    for (const neighbor of getNeighbors(current, grid)) {
      const tentativeGScore = gScore.get(nodeToString(current)) + 1;
      
      if (tentativeGScore < (gScore.get(nodeToString(neighbor)) ?? Infinity)) {
        cameFrom.set(nodeToString(neighbor), current);
        gScore.set(nodeToString(neighbor), tentativeGScore);
        fScore.set(
          nodeToString(neighbor), 
          tentativeGScore + heuristic(neighbor, end)
        );
        
        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
        }
      }
    }
  }
  
  return null; // No path found
}

// Manhattan distance heuristic
function heuristic(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function nodeToString(node) {
  return \`\${node[0]},\${node[1]}\`;
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  
  for (const [dx, dy] of dirs) {
    const newX = node[0] + dx;
    const newY = node[1] + dy;
    
    if (
      newX >= 0 && 
      newX < grid.length && 
      newY >= 0 && 
      newY < grid[0].length &&
      grid[newX][newY] !== 1 // Not a wall
    ) {
      neighbors.push([newX, newY]);
    }
  }
  
  return neighbors;
}

function getLowestFScore(openSet, fScore) {
  let lowest = null;
  let lowestScore = Infinity;
  
  for (const node of openSet) {
    const score = fScore.get(nodeToString(node)) ?? Infinity;
    if (score < lowestScore) {
      lowest = node;
      lowestScore = score;
    }
  }
  
  return lowest;
}

function reconstructPath(cameFrom, current) {
  const path = [current];
  let currentStr = nodeToString(current);
  
  while (cameFrom.has(currentStr)) {
    current = cameFrom.get(currentStr);
    currentStr = nodeToString(current);
    path.unshift(current);
  }
  
  return path;
}`
};
