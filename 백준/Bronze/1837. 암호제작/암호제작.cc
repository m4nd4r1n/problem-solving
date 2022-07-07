#include <bits/stdc++.h>

#define MAX 1000000

using namespace std;

bool arr[MAX + 1];
int K;
string P;

void prime() {
	for (int i = 2; i * i <= MAX; i++) {
		if (!arr[i]) {
			for (int j = i * i; j <= MAX; j += i) {
				arr[j] = true;
			}
		}
	}
}

bool check(int num) {
	int sum = 0;
	for (char c: P) {
		sum = (10 * sum + (c - '0')) % num;
	}
	if (sum == 0) return true;
	return false;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	prime();

	cin >> P >> K;

	bool good = true;
	int r;
	for (int i = 2; i <= MAX; i++) {
		if (!arr[i] && check(i)) {
			if (i < K) {
				good = false;
				r = i;
			}
			break;
		}
	}

	if (good) printf("GOOD");
	else printf("BAD %d", r);

	return 0;
}