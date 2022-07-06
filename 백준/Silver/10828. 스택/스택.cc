#include <bits/stdc++.h>

using namespace std;

int N;
stack<int> s;

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
			s.push(num);
		} else if (command == "pop") {
			if (s.empty()) printf("-1\n");
			else {
				printf("%d\n", s.top());
				s.pop();
			}
		} else if (command == "size") {
			printf("%lu\n", s.size());
		} else if (command == "empty") {
			if (s.empty()) printf("1\n");
			else printf("0\n");
		} else if (command == "top") {
			if (s.empty()) printf("-1\n");
			else {
				printf("%d\n", s.top());
			}
		}
	}

	return 0;
}