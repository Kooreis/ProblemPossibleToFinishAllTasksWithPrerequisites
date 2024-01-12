for(let i = 0; i < prerequisites.length; i++) {
        if(graph.has(prerequisites[i][1])) {
            graph.get(prerequisites[i][1]).push(prerequisites[i][0]);
        } else {
            graph.set(prerequisites[i][1], [prerequisites[i][0]]);
        }
    }