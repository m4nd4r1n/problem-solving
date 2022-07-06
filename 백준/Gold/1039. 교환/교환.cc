#include <bits/stdc++.h>

using namespace std;

int K;
string N;
queue<string> q;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);

	cin >> N >> K;

	q.push(N);
	for (int i = 0; i < K; i++) {
		set<string> s;
		int size = q.size();
		for (int j = 0; j < size; j++) {
			string num = q.front();
			q.pop();
			if (s.count(num) != 0) continue;
			s.insert(num);

			for (int k = 0; k < num.size(); k++) {
				for (int l = k + 1; l < num.size(); l++) {
					if (k != 0 || num[l] != '0') {
						char tmp = num[k];
						num[k] = num[l];
						num[l] = tmp;
						q.push(num);
						num[l] = num[k];
						num[k] = tmp;
					}
				}
			}
		}
	}
	string answer = "0";
	while (!q.empty()) {
		answer = max(answer, q.front());
		q.pop();
	}
	if (answer[0] == '0') printf("-1");
	else cout << answer;

	return 0;
}