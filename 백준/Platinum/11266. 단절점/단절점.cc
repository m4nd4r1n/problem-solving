#include <bits/stdc++.h>

using namespace std;

#define MAX 10000

int V, E;
vector<int> graph[MAX + 1];
int discover[MAX + 1];
bool bp[MAX + 1];
int order;

int DFS(int node, bool root) {
    // 탐색 순서
    int ret = discover[node] = ++order;
    int child = 0;
    for (int next: graph[node]) {
        // 탐색된 노드면 현재 방문순서와 탐색된 노드의 방문순서 중 min 값 선택
        if (discover[next]) {
            ret = min(ret, discover[next]);
            continue;
        }
        child++;
        int low = DFS(next, false);
        // 현재 노드가 root가 아니면서 DFS 탐색 후 반환한 값이 자신의 방문 순서보다 크거나 같으면 단절점
        if (!root && low >= discover[node]) bp[node] = true;
        ret = min(ret, low);
    }
    // 현재 노드가 root면서 자식이 2개 이상이면 단절점
    if (root) bp[node] = child >= 2;
    return ret;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> V >> E;
    int A, B;
    for (int i = 0; i < E; i++) {
        cin >> A >> B;
        graph[A].emplace_back(B);
        graph[B].emplace_back(A);
    }

    for (int i = 1; i <= V; i++) {
        // 탐색하지 않은 노드라면 탐색
        if (!discover[i]) DFS(i, true);
    }
    // 단절점 카운트
    int cnt = 0;
    for (int i = 1; i <= V; i++) {
        if (bp[i]) cnt++;
    }
    printf("%d\n", cnt);
    // 단절점 출력
    for (int i = 1; i <= V; i++) {
        if (bp[i]) printf("%d ", i);
    }

    return 0;
}