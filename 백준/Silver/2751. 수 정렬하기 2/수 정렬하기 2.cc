#include <bits/stdc++.h>

using namespace std;

int N;
vector<int> v;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);

	cin >> N;
	v.resize(N);

	for (int i = 0; i < N; i++) {
		cin >> v[i];
	}
	sort(v.begin(), v.end());

	for (auto i: v) {
		printf("%d\n", i);
	}

	return 0;
}