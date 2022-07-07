#include <bits/stdc++.h>

#define MAX 4000000

using namespace std;

bool arr[MAX + 1];
vector<long long> primeSum;

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

	long long sum = 0;
	primeSum.emplace_back(sum);
	for (int i = 2; i <= MAX; i++) {
		if (!arr[i]) {
			sum += i;
			primeSum.emplace_back(sum);
		}
	}

	int num;
	cin >> num;

	int cnt = 0, left = 0, right = 0;
	while (left <= right && right < primeSum.size()) {
		if (primeSum[right] - primeSum[left] > num) left++;
		else if (primeSum[right] - primeSum[left] < num) right++;
		else {
			cnt++;
			right++;
		}
	}
	printf("%d", cnt);

	return 0;
}