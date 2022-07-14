#include <bits/stdc++.h>

using namespace std;

#define MAX 300

int N;
int arr[MAX + 1];
int dp[MAX + 1];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N;
    for (int i = 1; i <= N; i++) {
        cin >> arr[i];
    }

    dp[0] = arr[0];
    dp[1] = arr[0] + arr[1];
    dp[2] = arr[2] + max(arr[0], arr[1]);

    for (int i = 3; i <= N; i++) {
        dp[i] = arr[i] + max(dp[i - 2], dp[i - 3] + arr[i - 1]);
    }

    printf("%d", dp[N]);

    return 0;
}