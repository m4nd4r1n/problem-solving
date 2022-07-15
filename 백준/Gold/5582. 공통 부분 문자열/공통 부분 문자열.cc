#include <bits/stdc++.h>

using namespace std;

#define MAX 4000

string X, Y;
int LCS[MAX + 1][MAX + 1];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> X >> Y;

    int m = X.length();
    int n = Y.length();

    int result = 0;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X[i - 1] == Y[j - 1]) {
                LCS[i][j] = LCS[i - 1][j - 1] + 1;
                result = max(result, LCS[i][j]);
            }
        }
    }

    printf("%d", result);

    return 0;
}