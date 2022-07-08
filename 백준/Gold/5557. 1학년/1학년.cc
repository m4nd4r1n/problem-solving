#include <bits/stdc++.h>

#define MAX_N 100
#define MAX_SUM 20

using namespace std;

int N;
int nums[MAX_N + 1];
long long dp[MAX_N + 1][MAX_SUM + 1];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N;

	for (int i = 1; i <= N; i++) {
		cin >> nums[i];
	}
	
	dp[1][nums[1]] = 1;
	for (int i = 2; i < N; i++) {
		for (int j = 0; j <= MAX_SUM; j++) {
			if (dp[i - 1][j]) {
				if (j + nums[i] <= 20) dp[i][j + nums[i]] += dp[i - 1][j];
				if (j - nums[i] >= 0) dp[i][j - nums[i]] += dp[i - 1][j];
			}
		}
	}

	printf("%lld", dp[N - 1][nums[N]]);

	return 0;
}