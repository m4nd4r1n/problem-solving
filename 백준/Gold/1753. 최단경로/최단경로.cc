#include <bits/stdc++.h>

using namespace std;

#define MAX 20000

int V, E, K;
vector<pair<int, int>> graph[MAX + 1];
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
vector<int> dist;

void Dijkstra() {
    // 출발점을 0으로 저장, 최소 힙에 삽입
    dist[K] = 0;
    pq.emplace(0, K);
    while (!pq.empty()) {
        int cost = pq.top().first;
        int cur = pq.top().second;
        pq.pop();
        // 더 짧은 경로가 있는 경우 무시
        if (dist[cur] < cost) continue;
        // 인접한 노드 확인
        for (auto &i: graph[cur]) {
            int next = i.first;
            int nextDist = cost + i.second;
            // 더 짧은 경로가 있으면 갱신, 최소 힙에 삽입
            if (dist[next] > nextDist) {
                dist[next] = nextDist;
                pq.emplace(nextDist, next);
            }
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> V >> E >> K;
    int u, v, w;
    for (int i = 0; i < E; i++) {
        cin >> u >> v >> w;
        graph[u].emplace_back(v, w);
    }
    dist.assign(V + 1, INT_MAX);
    Dijkstra();
    for (int i = 1; i < V + 1; i++) {
        if (dist[i] == INT_MAX) printf("INF\n");
        else printf("%d\n", dist[i]);
    }

    return 0;
}