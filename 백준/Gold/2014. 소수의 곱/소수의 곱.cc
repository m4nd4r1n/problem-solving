#include <bits/stdc++.h>

using namespace std;

int N, K;

priority_queue<long long, vector<long long>, greater<>> pq;
vector<int> prime;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> K >> N;
	prime.resize(K);
	for (int i = 0; i < K; i++) {
		cin >> prime[i];
		pq.emplace(prime[i]);
	}

	for (int i = 0; i < N - 1; i++) {
		long long num = pq.top();
		pq.pop();
		for (int j = 0; j < K; j++) {
			pq.emplace(num * prime[j]);
			// 중복 계산 생략
			if (num % prime[j] == 0) break;
		}
	}
	printf("%lld", pq.top());
	return 0;
}