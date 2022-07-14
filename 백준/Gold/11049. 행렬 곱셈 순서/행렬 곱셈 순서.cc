#include <bits/stdc++.h>

using namespace std;

#define MAX 500

int N;
// dp[i][j] : i번 행렬부터 j번 행렬까지 곱했을 때 최소 연산 수
int dp[MAX + 1][MAX + 1];
vector<pair<int, int>> rc;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N;
    rc.resize(N + 1);
    for (int i = 1; i <= N; i++) {
        cin >> rc[i].first >> rc[i].second;
    }
    // step=1 dp[1][2], dp[2][3], ... dp[N-1][N]
    // step=2 dp[1][3], dp[2][4], ... dp[N-2][N]
    // ...
    // step=N-1 dp[1][N]
    for (int step = 1; step < N; step++) {
        for (int start = 1; start + step <= N; start++) {
            int end = start + step;
            dp[start][end] = INT_MAX;
            for (int mid = start; mid < end; mid++) {
                dp[start][end] = min(dp[start][end], dp[start][mid] + dp[mid + 1][end] +
                                                     rc[start].first * rc[end].second * rc[mid].second);
            }
        }
    }

    printf("%d", dp[1][N]);

    return 0;
}