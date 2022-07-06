#include <bits/stdc++.h>

#define MAX 50

using namespace std;

int N, K;
int Max;
int word[MAX];
int checked;

void DFS(int pick, int start, int check) {
	if (pick == 0) {
		int cnt = 0;
		for (int i = 0; i < N; i++) {
			if ((word[i] & check) == word[i]) cnt++;
		}
		if (Max < cnt) Max = cnt;
		return;
	}

	for (int i = start; i < 26; i++) {
		if ((check & (1 << i)) == 0) {
			check |= (1 << i);
			DFS(pick - 1, i, check);
			check &= ~(1 << i);
		}
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);

	cin >> N >> K;
	string str;
	for (int i = 0; i < N; i++) {
		cin >> str;
		int num = 0;
		for (char c: str) {
			num |= 1 << (c - 'a');
		}
		word[i] = num;
	}

	if (K < 5) {
		printf("0");
		return 0;
	}
	if (K == 26) {
		printf("%d", N);
		return 0;
	}
	char antic[] = "antic";
	for (char c: antic) {
		checked |= 1 << (c - 'a');
	}
	DFS(K - 5, 0, checked);
	printf("%d", Max);


	return 0;
}