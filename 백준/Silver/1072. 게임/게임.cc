#include <bits/stdc++.h>

#define MAX 1000000000

using namespace std;

long long X, Y, cnt;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> X >> Y;

	int Z = Y * 100 / X;

	if (Z >= 99) {
		printf("-1");
		return 0;
	}
	int low = 0, high = MAX, result = 0;

	while (low <= high) {
		int mid = (low + high) / 2;
		int newZ = (Y + mid) * 100 / (X + mid);
		if (Z >= newZ) {
			result = mid + 1;
			low = mid + 1;
		} else {
			high = mid - 1;
		}
	}

	printf("%d", result);

	return 0;
}