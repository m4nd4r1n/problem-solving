#include <bits/stdc++.h>

using namespace std;

int N;
priority_queue<int, vector<int>, less<>> Max;
priority_queue<int, vector<int>, greater<>> Min;

void Swap() {
	if (Max.empty()) return;
	if (Min.empty()) return;
	if (Max.top() <= Min.top()) return;
	int max = Max.top();
	int min = Min.top();
	Max.pop();
	Min.pop();
	Max.emplace(min);
	Min.emplace(max);
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N;
	unsigned int num;

	for (int i = 0; i < N; i++) {
		cin >> num;
		if (Max.size() <= Min.size()) Max.emplace(num);
		else Min.emplace(num);
		Swap();
		printf("%d\n", Max.top());
	}

	return 0;
}