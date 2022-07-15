#include <bits/stdc++.h>

using namespace std;

int N, M;
int m[101], c[101];
int dp[101][10001];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N >> M;

    for (int i = 1; i <= N; i++) {
        cin >> m[i];
    }
    for (int i = 1; i <= N; i++) {
        cin >> c[i];
    }

    for (int i = 1; i <= N; i++) {
        for (int j = 0; j < c[i]; j++) {
            dp[i][j] = dp[i - 1][j];
        }
        for (int j = c[i]; j <= 10000; j++) {
            dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - c[i]] + m[i]);
        }
    }
    for (int i = 0; i <= 10000; i++) {
        if (dp[N][i] >= M) {
            printf("%d\n", i);
            break;
        }
    }

    return 0;
}