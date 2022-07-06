#include <bits/stdc++.h>

#define MAX 90

using namespace std;

int N;
long long A[MAX + 1] = {0, 1,};

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);

	cin >> N;

	for (int i = 2; i <= N; i++) {
		A[i] = A[i - 1] + A[i - 2];
	}

	printf("%lld", A[N]);

	return 0;
}