#include <bits/stdc++.h>

using namespace std;

int board[9][9];
vector<pair<int, int>> coord;
int blank;
bool complete;

bool check(int x, int y) {
	for (int i = 0; i < 9; i++) {
		if (board[x][i] == board[x][y] && i != y || board[i][y] == board[x][y] && i != x) return false;
	}
	for (int i = x / 3 * 3; i < x / 3 * 3 + 3; i++) {
		for (int j = y / 3 * 3; j < y / 3 * 3 + 3; j++) {
			if (board[i][j] == board[x][y] && i != x && j != y) return false;
		}
	}
	return true;
}

void sudoku(int n) {
	if (n == blank) {
		for (auto &i: board) {
			for (int j: i) {
				printf("%d ", j);
			}
			printf("\n");
		}
		complete = true;
		return;
	}
	for (int j = 1; j <= 9; j++) {
		board[coord[n].first][coord[n].second] = j;
		if (check(coord[n].first, coord[n].second)) sudoku(n + 1);
		if (complete) return;
	}
	board[coord[n].first][coord[n].second] = 0;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);

	for (int i = 0; i < 9; i++) {
		for (int j = 0; j < 9; j++) {
			cin >> board[i][j];
			if (board[i][j] == 0) {
				blank++;
				coord.emplace_back(i, j);
			}
		}
	}
	sudoku(0);
	
	return 0;
}