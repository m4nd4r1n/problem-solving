#include <bits/stdc++.h>

#define MAX 1000000

using namespace std;

int N;
vector<long long> tree;

void update(int node, int start, int end, int index, long long val) {
	// [start,end]에 index가 포함되지 않는 경우
	if (index < start || index > end) {
		return;
	}
	tree[node] += val;
	if (start == end) {
		return;
	}
	update(node * 2, start, (start + end) / 2, index, val);
	update(node * 2 + 1, (start + end) / 2 + 1, end, index, val);

}

int query(int node, int start, int end, int index) {
	// 사탕 맛 순위 찾은 경우
	if (start >= end) {
		// 해당 사탕 하나 꺼냄
		update(1, 1, MAX, start, -1);
		// 해당 사탕의 인덱스(맛) 반환
		return start;
	}
	//// 자식 노드 비교
	// 왼쪽 자식
	if (tree[node * 2] >= index) {
		return query(node * 2, start, (start + end) / 2, index);
	} else {    // 오른쪽 자식
		return query(node * 2 + 1, (start + end) / 2 + 1, end, index - tree[node * 2]);
	}
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N;
	tree.resize((1 << ((int) ceil(log2(MAX)) + 1)));

	int A, B;
	long long C;
	for (int i = 0; i < N; i++) {
		cin >> A;
		if (A == 2) {
			cin >> B >> C;
			// B맛 사탕을 C개 추가
			update(1, 1, MAX, B, C);
		} else if (A == 1) {
			cin >> B;
			int num = query(1, 1, MAX, B);
			printf("%d\n", num);
		}
	}

	return 0;
}