#include <bits/stdc++.h>

#define MAX 4000

using namespace std;

int N;
long long A[MAX], B[MAX], C[MAX], D[MAX];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N;
	for (int i = 0; i < N; i++) {
		cin >> A[i] >> B[i] >> C[i] >> D[i];
	}
	vector<long long> sum2;

	for (int i = 0; i < N; i++) {
		for (int j = 0; j < N; j++) {
			sum2.emplace_back(C[i] + D[j]);
		}
	}
	sort(sum2.begin(), sum2.end());

	long long cnt = 0, sum1, low, high;
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < N; j++) {
			sum1 = A[i] + B[j];
			low = lower_bound(sum2.begin(), sum2.end(), -sum1) - sum2.begin();
			high = upper_bound(sum2.begin(), sum2.end(), -sum1) - sum2.begin();
			if (-sum1 == sum2[low]) cnt += (high - low);
		}
	}

	printf("%lld", cnt);

	return 0;
}