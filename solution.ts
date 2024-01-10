Here is a TypeScript solution using a topological sort approach:

```typescript
class Graph {
    private adjList: Map<number, number[]>;

    constructor() {
        this.adjList = new Map();
    }

    addEdge(src: number, dest: number) {
        if (!this.adjList.has(src)) {
            this.adjList.set(src, []);
        }
        this.adjList.get(src)!.push(dest);
    }

    isCyclicUtil(node: number, visited: boolean[], recStack: boolean[]): boolean {
        if (!visited[node]) {
            visited[node] = true;
            recStack[node] = true;

            const nodeNeighbors = this.adjList.get(node) || [];
            for (const currentNode of nodeNeighbors) {
                if (!visited[currentNode] && this.isCyclicUtil(currentNode, visited, recStack)) {
                    return true;
                } else if (recStack[currentNode]) {
                    return true;
                }
            }
        }
        recStack[node] = false;
        return false;
    }

    isCyclic(): boolean {
        const visited = [];
        const recStack = [];
        for (let node = 0; node < this.adjList.size; node++) {
            visited[node] = false;
            recStack[node] = false;
        }
        for (let node = 0; node < this.adjList.size; node++) {
            if (this.isCyclicUtil(node, visited, recStack)) {
                return true;
            }
        }
        return false;
    }
}

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const graph = new Graph();
    for (let i = 0; i < numCourses; i++) {
        graph.addEdge(i, i);
    }
    for (const [course, prerequisite] of prerequisites) {
        graph.addEdge(prerequisite, course);
    }
    return !graph.isCyclic();
}

console.log(canFinish(2, [[1, 0]])); // true
console.log(canFinish(2, [[1, 0], [0, 1]])); // false
```

This solution creates a directed graph where each node represents a course and each edge represents a prerequisite. It then checks if the graph contains a cycle. If it does, it means that there are circular dependencies between courses, so it's not possible to finish all tasks. If it doesn't, it means that all tasks can be finished.