#include <bits/stdc++.h>

using namespace std;

#define MAX 500

int N;
vector<int> build, degree, result;
vector<int> graph[MAX + 1];
queue<int> q;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N;

    degree.assign(N + 1, 0);
    build.resize(N + 1);
    result.resize(N + 1);

    int prev;
    for (int i = 1; i <= N; i++) {
        cin >> build[i];
        while (true) {
            cin >> prev;
            if (prev == -1) break;
            graph[prev].emplace_back(i);
            degree[i]++;
        }
    }

    for (int i = 1; i <= N; i++) {
        if (degree[i] == 0) {
            q.push(i);
            result[i] = build[i];
        }
    }

    while (!q.empty()) {
        int cur = q.front();
        q.pop();

        for (int next: graph[cur]) {
            result[next] = max(result[next], result[cur] + build[next]);
            if (--degree[next] == 0) q.push(next);
        }
    }

    for (auto res: result) {
        if (res == 0) continue;
        printf("%d\n", res);
    }

    return 0;
}