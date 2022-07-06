#include <bits/stdc++.h>

using namespace std;

int N;
vector<int> tree;
vector<pair<int, int>> arr;

int query(int node, int start, int end, int left, int right) {
	// [left,right]와 [start,end]가 겹치지 않는 경우
	if (left > end || right < start) {
		return 0;
	}
	// [left,right]가 [start,end]를 완전히 포함하는 경우
	if (left <= start && end <= right) {
		return tree[node];
	}
	int lmin = query(node * 2, start, (start + end) / 2, left, right);
	int rmin = query(node * 2 + 1, (start + end) / 2 + 1, end, left, right);
	return lmin + rmin;
}

void update(int node, int start, int end, int index, int val) {
	if (index < start || index > end) {
		return;
	}
	if (start == end) {
		tree[node] += val;
		return;
	}
	update(node * 2, start, (start + end) / 2, index, val);
	update(node * 2 + 1, (start + end) / 2 + 1, end, index, val);
	tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

bool skillDesc(pair<int, int> a, pair<int, int> b) {
	return a.first > b.first;
}

bool indexAsc(pair<int, int> a, pair<int, int> b) {
	return a.second < b.second;
}

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(nullptr);

	cin >> N;

	tree.resize((1 << ((int) ceil(log2(N)) + 1)));
	arr.resize(N);

	for (int i = 0; i < N; i++) {
		cin >> arr[i].first;
		// 인덱스 저장
		arr[i].second = i;
	}

	//// 좌표 압축 진행
	// 실력 내림차순 정렬
	sort(arr.begin(), arr.end(), skillDesc);
	// 실력 높은 사람이 가장 낮은 숫자를 가지도록 압축
	for (int i = 0; i < N; i++) {
		arr[i].first = i;
	}
	// 다시 인덱스 순으로 정렬
	sort(arr.begin(), arr.end(), indexAsc);

	// 인덱스 순서대로 세그먼트 트리에 삽입
	int front;
	for (int i = 0; i < N; i++) {
		// 본인 실력보다 좋은 사람들의 부분합 출력
		front = query(1, 0, N - 1, 0, arr[i].first);
		printf("%d\n", front + 1);
		// 본인 위치에 +1
		update(1, 0, N - 1, arr[i].first, 1);
	}

	return 0;
}