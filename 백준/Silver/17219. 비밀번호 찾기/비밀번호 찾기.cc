#include <bits/stdc++.h>

using namespace std;

int N, M;
unordered_map<string, string> m;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> N >> M;
    string site, pw;
    for (int i = 0; i < N; i++) {
        cin >> site >> pw;
        m.emplace(site, pw);
    }

    for (int i = 0; i < M; i++) {
        cin >> site;
        cout << m[site] << "\n";
    }

    return 0;
}