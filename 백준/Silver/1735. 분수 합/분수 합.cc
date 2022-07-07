#include <bits/stdc++.h>

using namespace std;

int denominator[2], numerator[2];

int GCD(int n1, int n2) {
	if (n2 == 0)return n1;
	else return gcd(n2, n1 % n2);
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> numerator[0] >> denominator[0] >> numerator[1] >> denominator[1];
	
	int gcd = GCD(denominator[0], denominator[1]);
	int resultDnm = denominator[0] * denominator[1] / gcd;
	int resultNmr = (numerator[0] * denominator[1] / gcd) + (numerator[1] * denominator[0] / gcd);
	gcd = GCD(resultNmr, resultDnm);
	resultNmr /= gcd;
	resultDnm /= gcd;
	printf("%d %d", resultNmr, resultDnm);
	return 0;
}