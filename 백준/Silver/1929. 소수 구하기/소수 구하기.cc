#include <bits/stdc++.h>

#define MAX 1000000

using namespace std;

int N, M;
bool arr[MAX + 1];

void prime() {
    arr[1] = true;
    for (int i = 2; i * i <= MAX; i++) {
        if (!arr[i]) {
            for (int j = i * i; j <= MAX; j += i) {
                arr[j] = true;
            }
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N >> M;

    prime();

    for (int i = N; i <= M; i++) {
        if (!arr[i]) printf("%d\n", i);
    }

    return 0;
}