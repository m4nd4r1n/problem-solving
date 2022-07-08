#include <bits/stdc++.h>

using namespace std;

int N, M;
vector<int> nums;
vector<int> selected;
vector<bool> check;

void choose(int cnt) {
	if (cnt == M) {
		for (auto i: selected) {
			printf("%d ", i);
		}
		printf("\n");
		return;
	}
	int last = 0;
	for (int i = 0; i < N; i++) {
		if (!check[i] && nums[i] != last) {
			last = selected[cnt] = nums[i];
			check[i] = true;
			choose(cnt + 1);
			check[i] = false;
		}
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N >> M;

	nums.resize(N);
	check.resize(N);
	selected.resize(M);
	for (int i = 0; i < N; i++) {
		cin >> nums[i];
	}
	sort(nums.begin(), nums.end());
	choose(0);

	return 0;
}