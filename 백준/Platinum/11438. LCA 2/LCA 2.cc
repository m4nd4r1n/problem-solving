#include <bits/stdc++.h>

using namespace std;

#define MAX 100000

int N, M, H;
vector<int> graph[MAX + 1];
int depth[MAX + 1];
int parent[20][MAX + 1];

void DFS(int p, int node, int d) {
    if (graph[node].empty()) return;
    depth[node] = d;
    parent[0][node] = p;
    for (int next: graph[node]) {
        if (next != p) DFS(node, next, d + 1);
    }
}

int LCA(int a, int b) {
    if (depth[a] != depth[b]) {
        if (depth[a] < depth[b]) swap(a, b);
        int diff = depth[a] - depth[b];
        for (int i = 0; diff > 0; i++) {
            if (diff % 2 == 1) a = parent[i][a];
            diff = diff >> 1;
        }
    }
    if (a != b) {
        for (int k = H; k >= 0; k--)
            if (parent[k][a] != 0 && parent[k][a] != parent[k][b]) {
                a = parent[k][a];
                b = parent[k][b];
            }
        a = parent[0][a];
    }
    return a;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N;
    int a, b;
    for (int i = 0; i < N - 1; i++) {
        cin >> a >> b;
        graph[a].emplace_back(b);
        graph[b].emplace_back(a);
    }
    DFS(0, 1, 0);
    int temp = N;
    while (temp > 1) {
        temp = temp >> 1;
        H++;
    }
    for (int k = 1; k <= H; k++) {
        for (int v = 2; v <= N; v++) {
            if (parent[k - 1][v] != 0)
                parent[k][v] = parent[k - 1][parent[k - 1][v]];
        }
    }

    cin >> M;
    for (int i = 0; i < M; i++) {
        cin >> a >> b;
        printf("%d\n", LCA(a, b));
    }

    return 0;
}