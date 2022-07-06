// segment tree
#include <bits/stdc++.h>

using namespace std;

int N, M, K;
vector<long long> tree;
vector<long long> arr;

long long init(int node, int start, int end) {
	// 리프 노드인 경우
	if (start == end) {
		return tree[node] = arr[start];
	} else {
		// node의 left child = node*2
		// node의 right child = node*2+1
		// node의 구간이 [start,end]이면
		// left child 구간 = [start,(start+end)/2]
		// right child 구간 = [(start+end)/2+1,end]
		return tree[node] = init(node * 2, start, (start + end) / 2) +
							init(node * 2 + 1, (start + end) / 2 + 1, end);
	}
}

long long sum(int node, int start, int end, int left, int right) {
	// [left,right]와 [start,end]가 겹치지 않는 경우
	if (left > end || right < start) {
		return 0;
	}
	// [left,right]가 [start,end]를 완전히 포함하는 경우
	if (left <= start && end <= right) {
		return tree[node];
	}
	return sum(node * 2, start, (start + end) / 2, left, right) +
		   sum(node * 2 + 1, (start + end) / 2 + 1, end, left, right);
}

void update(int node, int start, int end, int index, long long diff) {
	// [start,end]에 index가 포함되지 않는 경우
	if (index < start || index > end) return;

	tree[node] = tree[node] + diff;
	if (start != end) {
		update(node * 2, start, (start + end) / 2, index, diff);
		update(node * 2 + 1, (start + end) / 2 + 1, end, index, diff);
	}
}

void update(int index, long long val) {
	long long diff = val - arr[index];
	arr[index] = val;
	update(1, 0, N - 1, index, diff);
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N >> M >> K;

	tree.resize((1 << ((int) ceil(log2(N)) + 1)));
	arr.resize(N);

	for (int i = 0; i < N; i++) {
		cin >> arr[i];
	}

	init(1, 0, N - 1);

	int a, b;
	for (int i = 0; i < M + K; i++) {
		cin >> a >> b;
		if (a == 1) {
			long long c;
			cin >> c;
			update(b - 1, c);
		} else if (a == 2) {
			int c;
			cin >> c;
			printf("%lld\n", sum(1, 0, N - 1, b - 1, c - 1));
		}
	}

	return 0;
}