#include <bits/stdc++.h>

using namespace std;

int N, M, T, K;
vector<pair<int, int>> coord;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N >> M >> T >> K;
	coord.resize(T);
	for (int i = 0; i < T; i++) {
		cin >> coord[i].first >> coord[i].second;
	}
	
	pair<int, int> maxCoord;
	int max = 0, x, y;
	for (int i = 0; i < T; i++) {
		for (int j = 0; j < T; j++) {
			if (coord[i].first > N - K) x = N - K;
			else x = coord[i].first;
			if (coord[j].second > M - K) y = M - K;
			else y = coord[j].second;
			int now = 0;
			for (auto item: coord) {
				if (x <= item.first && item.first <= x + K && y <= item.second && item.second <= y + K) now++;
			}
			if (max < now) {
				max = now;
				maxCoord.first = x;
				maxCoord.second = y + K;
			}
		}
	}

	printf("%d %d\n", maxCoord.first, maxCoord.second);
	printf("%d", max);

	return 0;
}