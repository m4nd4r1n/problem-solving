#include <bits/stdc++.h>

#define MAX 15

using namespace std;

int N;
int board[MAX];
int cnt;

bool CanSet(int row) {
	for (int col = 0; col < row; col++) {
		if (board[row] == board[col] || row - col == abs(board[row] - board[col])) {
			return false;
		}
	}
	return true;
}

void queen(int row) {
	if (row == N) {
		cnt++;
		return;
	}

	for (int col = 0; col < N; col++) {
		board[row] = col;
		if (CanSet(row)) {
			queen(row + 1);
		}
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);

	cin >> N;

	queen(0);
	printf("%d", cnt);

	return 0;
}