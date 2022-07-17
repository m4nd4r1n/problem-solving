#include <bits/stdc++.h>

using namespace std;

int T;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> T;

    int x1, y1, r1, x2, y2, r2;
    for (int i = 0; i < T; i++) {
        cin >> x1 >> y1 >> r1 >> x2 >> y2 >> r2;

        double dist = sqrt((pow(x2 - x1, 2) + pow(y2 - y1, 2)));
        int diff = abs(r2 - r1);
        int sum = r1 + r2;

        if (dist == 0 && r2 == r1) printf("-1\n");
        else if (dist == diff || dist == sum) printf("1\n");
        else if (diff < dist && dist < sum) printf("2\n");
        else printf("0\n");
    }

    return 0;
}