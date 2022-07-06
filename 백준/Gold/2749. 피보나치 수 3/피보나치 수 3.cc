// 피사노 주기
// N번째 피보나치 수를 M으로 나눈 나머지 = N%P(주기)번째를 M으로 나눈 나머지
// M = 10^k, k>2 then P = 15*10^(k-1)
#include <bits/stdc++.h>

using namespace std;

const int M = 1000000;
const int P = 15 * M / 10;
long long N;
long long fibo[P] = {0, 1};

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N;

	for (int i = 2; i < P; i++) {
		fibo[i] = fibo[i - 1] + fibo[i - 2];
		fibo[i] %= M;
	}

	printf("%lld", fibo[N % P]);

	return 0;
}