#include <bits/stdc++.h>

using namespace std;

#define MAX 1000

int N, M;
int arr[MAX + 1][MAX + 1];
int dp[MAX + 1][MAX + 1];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    string str;

    cin >> N >> M;
    for (int i = 1; i <= N; i++) {
        cin >> str;
        for (int j = 0; j < M; j++) {
            arr[i][j + 1] = str[j] - '0';
        }
    }
    int mxm = 0;
    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= M; j++) {
            if (arr[i][j] == 0) continue;
            dp[i][j] = min(min(dp[i][j - 1], dp[i - 1][j - 1]), dp[i - 1][j]) + 1;
            if (mxm < dp[i][j]) mxm = dp[i][j];
        }
    }

    printf("%d", mxm * mxm);

    return 0;
}