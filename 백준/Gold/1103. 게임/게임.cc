#include <bits/stdc++.h>

#define MAX 50
#define DIR_NUM 4

using namespace std;

int N, M;
char board[MAX][MAX];
bool visited[MAX][MAX];
int dp[MAX][MAX];
int dx[DIR_NUM] = {0, 1, 0, -1};
int dy[DIR_NUM] = {1, 0, -1, 0};
bool circle;

int DFS(int x, int y) {
	if (!(x >= 0 && x < N && y >= 0 && y < M)) {
		return 0;
	}
	if (board[x][y] == 'H') {
		return 0;
	}
	if (visited[x][y]) {
		circle = true;
		return -1;
	}
	if (dp[x][y] != -1) return dp[x][y];
	visited[x][y] = true;
	for (int i = 0; i < DIR_NUM; i++) {
		int nextX = x + dx[i] * (board[x][y] - '0');
		int nextY = y + dy[i] * (board[x][y] - '0');
		dp[x][y] = max(dp[x][y], DFS(nextX, nextY) + 1);
	}
	visited[x][y] = false;
	return dp[x][y];
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);

	cin >> N >> M;
	for (int i = 0; i < N; i++) {
		for (int j = 0; j < M; j++) {
			cin >> board[i][j];
		}
	}
	memset(dp, -1, sizeof(dp));
	int answer = DFS(0, 0);
	if (circle) printf("-1");
	else printf("%d", answer);
	
	return 0;
}