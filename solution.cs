Here is a JavaScript solution using Depth-First Search (DFS) to detect if there is a cycle in the task prerequisites graph. If there is a cycle, it means that there are tasks that depend on each other in a circular way, and thus it is impossible to finish all tasks.

```javascript
function canFinish(numCourses, prerequisites) {
    let graph = new Map();
    let visited = new Array(numCourses).fill(0);
    
    for(let i = 0; i < prerequisites.length; i++) {
        if(graph.has(prerequisites[i][1])) {
            graph.get(prerequisites[i][1]).push(prerequisites[i][0]);
        } else {
            graph.set(prerequisites[i][1], [prerequisites[i][0]]);
        }
    }
    
    for(let i = 0; i < numCourses; i++) {
        if(!dfs(graph, visited, i)) {
            return false;
        }
    }
    
    return true;
}

function dfs(graph, visited, i) {
    if(visited[i] === -1) {
        return false;
    }
    
    if(visited[i] === 1) {
        return true;
    }
    
    visited[i] = -1;
    
    if(graph.has(i)) {
        for(let j of graph.get(i)) {
            if(!dfs(graph, visited, j)) {
                return false;
            }
        }
    }
    
    visited[i] = 1;
    
    return true;
}

console.log(canFinish(2, [[1,0]])); // true
console.log(canFinish(2, [[1,0],[0,1]])); // false
```

In this solution, the `canFinish` function creates a graph from the prerequisites, and then checks each course using the `dfs` function to see if it is part of a cycle. If any course is part of a cycle, the function returns false. If all courses are checked and none of them are part of a cycle, the function returns true.