#include <bits/stdc++.h>

using namespace std;

#define MAX 32000

int N, M;
vector<int> graph[MAX + 1];
vector<int> degree;
queue<int> q;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N >> M;

    degree.assign(N + 1, 0);

    int a, b;
    for (int i = 0; i < M; i++) {
        cin >> a >> b;
        graph[a].emplace_back(b);
        degree[b]++;
    }

    for (int i = 1; i <= N; i++) {
        if (degree[i] == 0) q.push(i);
    }

    while (!q.empty()) {
        int cur = q.front();
        q.pop();
        printf("%d ", cur);
        for (int next: graph[cur]) {
            if (--degree[next] == 0) q.push(next);
        }
    }
    
    return 0;
}