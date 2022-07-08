#include <bits/stdc++.h>

using namespace std;

int N, K;

int binomial(int n, int k) {
	if (k == 0 || n == k) return 1;
	return binomial(n - 1, k) + binomial(n - 1, k - 1);
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N >> K;

	printf("%d", binomial(N, K));

	return 0;
}