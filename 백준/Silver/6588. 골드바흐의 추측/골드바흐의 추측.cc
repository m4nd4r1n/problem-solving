#include <bits/stdc++.h>

#define MAX 1000000

using namespace std;

bool arr[MAX + 1];

void prime() {
	for (int i = 2; i * i <= MAX; i++) {
		if (!arr[i]) {
			for (int j = i * i; j <= MAX; j += i) {
				arr[j] = true;
			}
		}
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	prime();

	bool found = false;
	int num;
	while (true) {
		cin >> num;
		if (num == 0) break;
		for (int a = 3; a <= num; a += 2) {
			int b = num - a;
			if (!arr[a] && !arr[b]) {
				found = true;
				printf("%d = %d + %d\n", num, a, b);
				break;
			}
		}
		if (!found) printf("Goldbach's conjecture is wrong.\n");
	}

	return 0;
}