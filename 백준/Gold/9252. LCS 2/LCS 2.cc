#include <bits/stdc++.h>

using namespace std;

#define MAX 1000

string X, Y;
int LCS[MAX + 1][MAX + 1];

void printLCS(int i, int j) {
    if (LCS[i][j] == 0) return;
    if (X[i - 1] == Y[j - 1]) {
        printLCS(i - 1, j - 1);
        printf("%c", X[i - 1]);
    } else {
        if (LCS[i - 1][j] > LCS[i][j - 1]) printLCS(i - 1, j);
        else printLCS(i, j - 1);
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> X >> Y;

    int m = X.length();
    int n = Y.length();

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X[i - 1] == Y[j - 1]) {
                LCS[i][j] = LCS[i - 1][j - 1] + 1;
            } else {
                LCS[i][j] = max(LCS[i - 1][j], LCS[i][j - 1]);
            }
        }
    }

    printf("%d\n", LCS[m][n]);

    printLCS(m, n);

    return 0;
}