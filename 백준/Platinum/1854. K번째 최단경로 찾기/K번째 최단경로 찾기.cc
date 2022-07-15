#include <bits/stdc++.h>

using namespace std;

#define MAX 1000

int N, M, K;
// first: node, second: cost
vector<pair<int, int>> AL[MAX + 1];
priority_queue<int> Visited[MAX + 1];
// first: cost, second: node
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N >> M >> K;
    int a, b, c;
    for (int i = 1; i <= M; i++) {
        cin >> a >> b >> c;
        AL[a].emplace_back(b, c);
    }

    Visited[1].emplace(0);
    pq.emplace(0, 1);
    while (!pq.empty()) {
        int node = pq.top().second;
        int cost = pq.top().first;
        pq.pop();

        for (auto &next: AL[node]) {
            int nextNode = next.first;
            int nextCost = cost + next.second;
            if (Visited[nextNode].size() < K) {
                Visited[nextNode].emplace(nextCost);
                pq.emplace(nextCost, nextNode);
            } else {
                if (Visited[nextNode].top() > nextCost) {
                    Visited[nextNode].pop();
                    Visited[nextNode].emplace(nextCost);
                    pq.emplace(nextCost, nextNode);
                }
            }
        }
    }

    for (int i = 1; i <= N; i++) {
        if (Visited[i].size() < K) printf("-1\n");
        else printf("%d\n", Visited[i].top());
    }

    return 0;
}