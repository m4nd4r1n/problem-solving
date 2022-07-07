#include <bits/stdc++.h>

#define MAX 1000000000

using namespace std;

int T, K, C;

//Cy - Kx = 1 을 만족하는 y 찾기
int extGCD(int A, int B) {
	int s0 = 1, s1 = 0, t0 = 0, t1 = 1, q, r, s, t, tmpA = A;
	while (B != 0) {
		q = A / B;
		r = A % B;
		A = B;
		B = r;
		s = s0 - q * s1;
		t = t0 - q * t1;
		s0 = s1;
		s1 = s;
		t0 = t1;
		t1 = t;
	}
	while (t0 < 0) t0 += tmpA;
	if (A != 1 || t0 > MAX) return -1;
	return t0;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> T;
	for (int i = 0; i < T; i++) {
		cin >> K >> C;
		if (C == 1) {
			if (K + 1 > MAX) printf("IMPOSSIBLE\n");
			else printf("%d\n", K + 1);
			continue;
		}
		if (K == 1) {
			printf("1\n");
			continue;
		}
		int result = extGCD(K, C);
		if (result == -1) printf("IMPOSSIBLE\n");
		else printf("%d\n", result);
	}

	return 0;
}