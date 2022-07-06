#include <bits/stdc++.h>

using namespace std;

int N;
queue<int> q;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N;
	string command;
	int num;
	for (int i = 0; i < N; i++) {
		cin >> command;
		if (command == "push") {
			cin >> num;
			q.emplace(num);
		} else if (command == "pop") {
			if (q.empty()) printf("-1\n");
			else {
				printf("%d\n", q.front());
				q.pop();
			}
		} else if (command == "size") {
			printf("%lu\n", q.size());
		} else if (command == "empty") {
			if (q.empty()) printf("1\n");
			else printf("0\n");
		} else if (command == "front") {
			if (q.empty()) printf("-1\n");
			else {
				printf("%d\n", q.front());
			}
		} else if (command == "back") {
			if (q.empty()) printf("-1\n");
			else {
				printf("%d\n", q.back());
			}
		}
	}

	return 0;
}