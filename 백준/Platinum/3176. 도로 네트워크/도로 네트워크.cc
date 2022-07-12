#include <bits/stdc++.h>

using namespace std;

#define MAX 100000
#define MAX_LEN 1000000

int N, M, H;
vector<pair<int, int>> graph[MAX + 1];
int depth[MAX + 1];
int parent[20][MAX + 1];
int Min[20][MAX + 1];
int Max[20][MAX + 1];

void DFS(int p, int node, int d, int l) {
    if (graph[node].empty()) return;
    depth[node] = d;
    parent[0][node] = p;
    Min[0][node] = Max[0][node] = l;
    for (pair<int, int> next: graph[node]) {
        if (next.first != p) DFS(node, next.first, d + 1, next.second);
    }
}

pair<int, int> LCA(int a, int b) {
    int resultMin = MAX_LEN + 1, resultMax = 0;
    if (depth[a] != depth[b]) {
        if (depth[a] < depth[b]) swap(a, b);
        int diff = depth[a] - depth[b];
        for (int i = 0; diff > 0; i++) {
            if (diff % 2 == 1) {
                resultMin = min(resultMin, Min[i][a]);
                resultMax = max(resultMax, Max[i][a]);
                a = parent[i][a];
            }
            diff = diff >> 1;
        }
    }
    if (a != b) {
        for (int k = H; k >= 0; k--) {
            if (parent[k][a] != 0 && parent[k][a] != parent[k][b]) {
                resultMin = min(resultMin, Min[k][a]);
                resultMin = min(resultMin, Min[k][b]);
                resultMax = max(resultMax, Max[k][a]);
                resultMax = max(resultMax, Max[k][b]);
                a = parent[k][a];
                b = parent[k][b];
            }
        }
        resultMin = min(resultMin, Min[0][a]);
        resultMin = min(resultMin, Min[0][b]);
        resultMax = max(resultMax, Max[0][a]);
        resultMax = max(resultMax, Max[0][b]);
    }
    return {resultMin, resultMax};
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N;
    int a, b, c;
    for (int i = 0; i < N - 1; i++) {
        cin >> a >> b >> c;
        graph[a].emplace_back(b, c);
        graph[b].emplace_back(a, c);
    }
    memset(Min, MAX_LEN + 1, sizeof(Min));
    DFS(0, 1, 0, 0);
    int temp = N;
    while (temp > 1) {
        temp = temp >> 1;
        H++;
    }
    for (int k = 1; k <= H; k++) {
        for (int v = 2; v <= N; v++) {
            if (parent[k - 1][v] != 0) {
                parent[k][v] = parent[k - 1][parent[k - 1][v]];
                Min[k][v] = min(Min[k - 1][parent[k - 1][v]], Min[k - 1][v]);
                Max[k][v] = max(Max[k - 1][parent[k - 1][v]], Max[k - 1][v]);
            }
        }
    }

    cin >> M;
    pair<int, int> result;
    for (int i = 0; i < M; i++) {
        cin >> a >> b;
        result = LCA(a, b);
        printf("%d %d\n", result.first, result.second);
    }

    return 0;
}