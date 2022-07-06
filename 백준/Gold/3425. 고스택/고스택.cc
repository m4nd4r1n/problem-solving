#include <bits/stdc++.h>

#define MAX 1000000000

using namespace std;

stack<long long> st;
vector<string> commands;
vector<long long> nums;
int N;

bool POP() {
	if (st.empty()) {
		return true;
	}
	st.pop();
	return false;
}

bool INV() {
	if (st.empty()) {
		return true;
	}
	long long top = st.top();
	st.pop();
	st.push(-top);
	return false;
}

bool DUP() {
	if (st.empty()) {
		return true;
	}
	st.push(st.top());
	return false;
}

bool SWP() {
	if (st.empty()) {
		return true;
	}
	long long first = st.top();
	st.pop();
	if (st.empty()) {
		return true;
	}
	long long second = st.top();
	st.pop();
	st.push(first);
	st.push(second);
	return false;
}

bool ADD() {
	if (st.empty()) {
		return true;
	}
	long long first = st.top();
	st.pop();
	if (st.empty()) {
		return true;
	}
	long long second = st.top();
	st.pop();
	st.push(first + second);
	return false;
}

bool SUB() {
	if (st.empty()) {
		return true;
	}
	long long first = st.top();
	st.pop();
	if (st.empty()) {
		return true;
	}
	long long second = st.top();
	st.pop();
	st.push(second - first);
	return false;
}

bool MUL() {
	if (st.empty()) {
		return true;
	}
	long long first = st.top();
	st.pop();
	if (st.empty()) {
		return true;
	}
	long long second = st.top();
	st.pop();
	st.push(first * second);
	return false;
}

bool DIV() {
	if (st.empty()) {
		return true;
	}
	long long first = st.top();
	st.pop();
	if (st.empty() || first == 0) {
		return true;
	}
	long long second = st.top();
	st.pop();
	long long div = abs(second) / abs(first);
	if (second < 0) {
		div = -div;
	}
	if (first < 0) {
		div = -div;
	}
	st.push(div);
	return false;
}

bool MOD() {
	if (st.empty()) {
		return true;
	}
	long long first = st.top();
	st.pop();
	if (st.empty() || first == 0) {
		return true;
	}
	long long second = st.top();
	st.pop();
	long long mod = abs(second) % abs(first);
	if (second < 0) {
		mod = -mod;
	}
	st.push(mod);
	return false;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);
	cout.tie(nullptr);
	string command;
	long long num;
	bool error;
	int index;
	while (true) {
		while (true) {
			cin >> command;
			if (command == "NUM") {
				cin >> num;
				nums.emplace_back(num);
			} else if (command == "END") {
				break;
			} else if (command == "QUIT") {
				return 0;
			}
			commands.emplace_back(command);
		}
		cin >> N;

		for (int i = 0; i < N; i++) {
			error = false;
			index = 0;
			int first;
			cin >> first;
			st.push(first);
			for (const auto &item: commands) {
				if (item == "NUM") {
					st.push(nums[index++]);
				} else if (item == "POP") {
					error = POP();
				} else if (item == "INV") {
					error = INV();
				} else if (item == "DUP") {
					error = DUP();
				} else if (item == "SWP") {
					error = SWP();
				} else if (item == "ADD") {
					error = ADD();
				} else if (item == "SUB") {
					error = SUB();
				} else if (item == "MUL") {
					error = MUL();
				} else if (item == "DIV") {
					error = DIV();
				} else if (item == "MOD") {
					error = MOD();
				}
				if (!st.empty() && (st.top() > MAX || st.top() < -MAX)) {
					error = true;
				}
				if (error) break;
			}
			if (error || st.size() != 1) {
				printf("ERROR\n");
			} else {
				printf("%lld\n", st.top());
			}
			while (!st.empty()) {
				st.pop();
			}
		}
		vector<long long>().swap(nums);
		vector<string>().swap(commands);
		printf("\n");
	}
}

