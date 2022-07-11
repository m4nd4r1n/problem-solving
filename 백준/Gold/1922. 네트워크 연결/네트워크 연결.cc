#include <bits/stdc++.h>

using namespace std;

#define MAX 1000

int N, M;
vector<pair<int, int>> graph[MAX + 1];
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
bool visited[MAX + 1];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N >> M;

    int a, b, c;
    for (int i = 0; i < M; i++) {
        cin >> a >> b >> c;
        graph[a].emplace_back(c, b);
        graph[b].emplace_back(c, a);
    }

    pq.emplace(0, 1);
    int result = 0;
    while (!pq.empty()) {
        int cost = pq.top().first;
        int vertex = pq.top().second;
        pq.pop();
        if (!visited[vertex]) {
            visited[vertex] = true;
            result += cost;
            for (auto &next: graph[vertex]) {
                if (!visited[next.second]) pq.emplace(next.first, next.second);
            }
        }
    }
    printf("%d", result);

    return 0;
}