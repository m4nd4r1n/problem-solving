#include <bits/stdc++.h>

using namespace std;

int N;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);

	cin >> N;

	int result = 0;
	while (N >= 0) {
		if (N % 5 == 0) {
			result += N / 5;
			printf("%d", result);
			return 0;
		}
		N -= 3;
		result++;
	}

	printf("-1");

	return 0;
}