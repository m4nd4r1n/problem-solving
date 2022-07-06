#include <bits/stdc++.h>

#define MAX 1000000

using namespace std;

int N, M;
int A[MAX];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);

	cin >> N >> M;
	for (int i = 0; i < N; i++) {
		cin >> A[i];
	}
	sort(A, A + N);

	int start = 0, end = A[N - 1], mid, max = -1;
	long long sum;
	while (start <= end) {
		sum = 0;
		mid = (start + end) / 2;
		for (int i = 0; i < N; i++) {
			if (A[i] > mid) sum += A[i] - mid;
		}
		if (sum >= M) {
			start = mid + 1;
			if (mid > max) max = mid;
		} else end = mid - 1;
	}

	printf("%d", max);


	return 0;
}