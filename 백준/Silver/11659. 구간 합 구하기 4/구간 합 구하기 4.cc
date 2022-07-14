#include <bits/stdc++.h>

using namespace std;

#define MAX 100000

int N, M;
int dp[MAX + 1];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N >> M;
    int num;
    for (int i = 0; i < N; i++) {
        cin >> num;
        dp[i + 1] = dp[i] + num;
    }

    int i, j;
    for (int k = 0; k < M; k++) {
        cin >> i >> j;
        printf("%d\n", dp[j] - dp[i - 1]);
    }

    return 0;
}