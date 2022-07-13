#include <bits/stdc++.h>

using namespace std;

#define MAX 100

int N, M;
long long d[MAX + 1][MAX + 1];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N >> M;
    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= N; j++) {
            if (i != j) d[i][j] = INT_MAX;
        }
    }

    int A, B, C;
    for (int i = 0; i < M; i++) {
        cin >> A >> B >> C;
        d[A][B] = min(d[A][B], (long long) C);
    }
    //중간 노드
    for (int m = 1; m <= N; m++) {
        //시작 노드
        for (int s = 1; s <= N; s++) {
            //마지막 노드
            for (int e = 1; e <= N; e++) {
                //중간을 거치는 것이 더 빠르면 업데이트
                if (d[s][e] > d[s][m] + d[m][e])
                    d[s][e] = d[s][m] + d[m][e];
            }
        }
    }

    for (int i = 1; i <= N; i++) {
        for (int j = 1; j <= N; j++) {
            if (d[i][j] == INT_MAX) printf("0 ");
            else printf("%lld ", d[i][j]);
        }
        printf("\n");
    }

    return 0;
}