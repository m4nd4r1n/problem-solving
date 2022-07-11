#include <bits/stdc++.h>

using namespace std;

int N, M;
vector<int> v;

int Find(int value) {
    if (v[value] == value)
        return value;
    else
        return v[value] = Find(v[value]);
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N >> M;

    v.assign(N + 1, 0);
    for (int i = 1; i <= N; ++i) {
        v[i] = i;
    }

    int cmd, a, b;
    for (int i = 0; i < M; i++) {
        cin >> cmd >> a >> b;
        if (cmd == 0) {
            int a_parent = Find(a);
            int b_parent = Find(b);

            if (a_parent < b_parent) v[b_parent] = a_parent;
            else v[a_parent] = b_parent;
            
        } else if (cmd == 1) {
            int a_parent = Find(a);
            int b_parent = Find(b);

            if (a_parent == b_parent) printf("YES\n");
            else printf("NO\n");
        }
    }

    return 0;
}