#include <bits/stdc++.h>

using namespace std;

int N;
vector<long long> v;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N;
	int num;
	for (int i = 0; i < N; i++) {
		cin >> num;
		v.emplace_back(num);
	}
	vector<long long> tmp(v);
	sort(tmp.begin(), tmp.end());
	tmp.erase(unique(tmp.begin(), tmp.end()), tmp.end());
	for (int i = 0; i < N; i++) {
		v[i] = lower_bound(tmp.begin(), tmp.end(), v[i]) - tmp.begin();
	}
	for (auto item: v) {
		printf("%lld ", item);
	}

	return 0;
}