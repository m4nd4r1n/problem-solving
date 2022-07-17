#include <bits/stdc++.h>

using namespace std;

string MBTI;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);

    cin >> MBTI;

    string result;

    for (char c: MBTI) {
        if (c == 'E') result.push_back('I');
        else if (c == 'I') result.push_back('E');
        else if (c == 'S') result.push_back('N');
        else if (c == 'N') result.push_back('S');
        else if (c == 'T') result.push_back('F');
        else if (c == 'F') result.push_back('T');
        else if (c == 'J') result.push_back('P');
        else if (c == 'P') result.push_back('J');
    }

    cout << result;

    return 0;
}