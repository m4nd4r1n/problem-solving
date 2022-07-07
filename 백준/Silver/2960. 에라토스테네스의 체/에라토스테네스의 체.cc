#include <bits/stdc++.h>

using namespace std;

int N, K;
int arr[1001];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N >> K;

	for (int i = 2; i <= N; i++) {
		for (int j = i; j <= N; j += i) {
			if (arr[j] == 0) {
				arr[j] = 1;
				K--;
			}
			if (K == 0) {
				printf("%d", j);
				return 0;
			}
		}
	}

	return 0;
}