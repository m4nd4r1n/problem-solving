#include <bits/stdc++.h>

#define EAST 0
#define NORTH 1
#define MAX 100
#define MOD 100000

using namespace std;

int w, h;
// [X][Y][방향][방향 전환 여부]
int dp[MAX + 1][MAX + 1][2][2];

void init() {
	for (int i = 2; i <= w; i++) {
		dp[i][1][EAST][false] = 1;
	}
	for (int i = 2; i <= h; i++) {
		dp[1][i][NORTH][false] = 1;
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);

	cin >> w >> h;

	init();
	for (int i = 2; i <= w; i++) {
		for (int j = 2; j <= h; j++) {
			dp[i][j][NORTH][false] = (dp[i][j - 1][NORTH][true] + dp[i][j - 1][NORTH][false]) % MOD;
			dp[i][j][NORTH][true] = dp[i][j - 1][EAST][false];
			dp[i][j][EAST][false] = (dp[i - 1][j][EAST][true] + dp[i - 1][j][EAST][false]) % MOD;
			dp[i][j][EAST][true] = dp[i - 1][j][NORTH][false];
		}
	}
	int result = 0;
	for (int i = 0; i < 2; i++) {
		for (int j = 0; j < 2; j++) {
			result += dp[w][h][i][j];
		}
	}
	printf("%d", result % MOD);

	return 0;
}