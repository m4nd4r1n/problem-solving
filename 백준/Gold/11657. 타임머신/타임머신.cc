#include <bits/stdc++.h>

using namespace std;

#define MAX 500

int N, M;
vector<pair<int, int>> graph[MAX + 1];
vector<long long> dist;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N >> M;
    int A, B, C;
    for (int i = 0; i < M; i++) {
        cin >> A >> B >> C;
        graph[A].emplace_back(B, C);
    }

    dist.assign(N + 1, INT_MAX);
    dist[1] = 0;
    for (int n = 1; n < N + 1; n++) {
        for (int i = 1; i < N + 1; i++) {
            for (auto &node: graph[i]) {
                int next = node.first;
                int nextCost = node.second;
                if (dist[i] != INT_MAX && dist[next] > nextCost + dist[i]) {
                    if (n == N) {
                        printf("-1\n");
                        return 0;
                    }
                    dist[next] = nextCost + dist[i];
                }
            }
        }
    }

    for (int i = 2; i < N + 1; i++) {
        if (dist[i] == INT_MAX) printf("-1\n");
        else printf("%lld\n", dist[i]);
    }

    return 0;
}