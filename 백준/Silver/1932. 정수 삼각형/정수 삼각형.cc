#include <bits/stdc++.h>

using namespace std;

#define MAX 500

int N;
int dp[MAX + 1][MAX + 1];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N;

    for (int i = 0; i < N; i++) {
        for (int j = 0; j <= i; j++) {
            cin >> dp[i][j];
        }
    }
    // 가장 아래층부터 둘 중 큰 값을 위층에 누적
    for (int i = N - 1; i >= 1; i--) {
        for (int j = 0; j < i; j++) {
            dp[i - 1][j] += max(dp[i][j], dp[i][j + 1]);
        }
    }

    printf("%d", dp[0][0]);

    return 0;
}