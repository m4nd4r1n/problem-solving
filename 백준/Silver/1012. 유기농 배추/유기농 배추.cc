#include <bits/stdc++.h>

#define MAX 50

using namespace std;

int T, M, N, K;
int field[MAX][MAX];
bool visited[MAX][MAX];
int dx[] = {-1, 1, 0, 0};
int dy[] = {0, 0, 1, -1};
int cnt;

bool InRange(int x, int y) {
    if (x >= 0 && x < N && y >= 0 && y < M) return true;
    return false;
}

void DFS(int x, int y) {
    visited[x][y] = true;
    for (int i = 0; i < 4; i++) {
        int nextX = x + dx[i];
        int nextY = y + dy[i];
        if (InRange(nextX, nextY) && field[nextX][nextY] && !visited[nextX][nextY]) {
            DFS(nextX, nextY);
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> T;

    for (int t = 0; t < T; t++) {
        cin >> M >> N >> K;
        int X, Y;
        for (int j = 0; j < K; j++) {
            cin >> Y >> X;
            field[X][Y] = 1;
        }
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (field[i][j] && !visited[i][j]) {
                    cnt++;
                    DFS(i, j);
                }
            }
        }
        printf("%d\n", cnt);
        cnt = 0;
        memset(field, 0, sizeof(field));
        memset(visited, false, sizeof(visited));
    }

    return 0;
}