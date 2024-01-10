```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses, vector<int>());
    vector<int> degree(numCourses, 0);
    for (auto &prereq : prerequisites) {
        adj[prereq[1]].push_back(prereq[0]);
        degree[prereq[0]]++;
    }
    queue<int> q;
    for (int i = 0; i < numCourses; i++)
        if (degree[i] == 0) q.push(i);
    while (!q.empty()) {
        int curr = q.front(); q.pop(); numCourses--;
        for (auto &next : adj[curr])
            if (--degree[next] == 0) q.push(next);
    }
    return numCourses == 0;
}

int main() {
    int numCourses;
    cin >> numCourses;
    int numPrerequisites;
    cin >> numPrerequisites;
    vector<vector<int>> prerequisites(numPrerequisites, vector<int>(2));
    for (int i = 0; i < numPrerequisites; i++) {
        cin >> prerequisites[i][0] >> prerequisites[i][1];
    }
    if (canFinish(numCourses, prerequisites)) {
        cout << "Yes, it is possible to finish all tasks." << endl;
    } else {
        cout << "No, it is not possible to finish all tasks." << endl;
    }
    return 0;
}
```