#include <bits/stdc++.h>

#define MAX 10000

using namespace std;

int N, M, cnt;
int A[MAX];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);

	cin >> N >> M;
	for (int i = 0; i < N; i++) {
		cin >> A[i];
	}

	int i = 0, j = 0, sum = 0;

	while (true) {
		if (sum >= M) sum -= A[i++];
		else if (j == N) break;
		else if (sum < M) sum += A[j++];
		
		if (sum == M)cnt++;
	}
	printf("%d", cnt);

	return 0;
}