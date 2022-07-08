#include <bits/stdc++.h>

#define MAX 50

using namespace std;

int K, M;
int color[MAX];

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> M;
	int sum = 0;
	for (int i = 0; i < M; i++) {
		cin >> color[i];
		sum += color[i];
	}
	cin >> K;

	if (M == 1 || K == 1) {
		printf("1.0");
		return 0;
	}
	double prob = 0, tmp;
	for (int i = 0; i < M; i++) {
		tmp = 1.0;
		if (color[i] < K) continue;
		for (int j = 0; j < K; j++) {
			tmp *= (double) (color[i] - j) / (sum - j);
		}
		prob += tmp;
	}

	printf("%.16lf", prob);
	return 0;
}