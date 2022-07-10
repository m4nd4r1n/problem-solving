#include <bits/stdc++.h>

#define MAX 100

using namespace std;

int N, M;
vector<int> graph[MAX + 1];
bool visited[MAX + 1];
int cnt = 0;

void DFS(int vertex) {
    for (auto i: graph[vertex]) {
        int curV = i;
        if (!visited[curV]) {
            cnt++;
            visited[curV] = true;
            DFS(curV);
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N >> M;
    int a, b;
    for (int i = 0; i < M; i++) {
        cin >> a >> b;
        graph[a].emplace_back(b);
        graph[b].emplace_back(a);
    }
    
    visited[1] = true;
    DFS(1);
    cout << cnt;
    return 0;
}