#include <bits/stdc++.h>

using namespace std;

int N;
priority_queue<unsigned int, vector<unsigned int>, greater<>> pq;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N;
	unsigned int num;
	for (int i = 0; i < N; i++) {
		cin >> num;
		if (num != 0) {
			pq.emplace(num);
		} else {
			if (pq.empty()) printf("0\n");
			else {
				printf("%d\n", pq.top());
				pq.pop();
			}
		}
	}

	return 0;
}