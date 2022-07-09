#include <bits/stdc++.h>

#define MAX_K 1000000000
#define MAX 100

using namespace std;

int N, M, K;
int dp[MAX + 1][MAX + 1];
string result;

int check(int n, int m) {
	if (n == 0 || m == 0) return 1;
	if (dp[n][m] != 0) return dp[n][m];
	dp[n][m] = min(check(n - 1, m) + check(n, m - 1), MAX_K + 1);
	return dp[n][m];
}

void choose(int n, int m, int k) {
	if (n == 0) {
		for (int i = 0; i < m; i++) {
			result.append("z");
		}
		return;
	}
	if (m == 0) {
		for (int i = 0; i < n; i++) {
			result.append("a");
		}
		return;
	}
	int chk = check(n - 1, m);
	if (k > chk) {
		result.append("z");
		choose(n, m - 1, k - chk);
	} else {
		result.append("a");
		choose(n - 1, m, k);
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);

	cin >> N >> M >> K;

	choose(N, M, K);
	if (check(N, M) < K) printf("-1");
	else printf("%s", result.c_str());

	return 0;
}