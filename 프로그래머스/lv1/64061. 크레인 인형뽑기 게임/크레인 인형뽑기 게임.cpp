#include <string>
#include <vector>

using namespace std;

int solution(vector<vector<int>> board, vector<int> moves) {
	int answer = 0;
	int board_size = board[0].size();
	vector<int> basket;
	for (auto move: moves) {
		for (int i = 0; i < board_size; i++) {
			if (board[i][move - 1] != 0) {
				if (!basket.empty() && basket.back() == board[i][move - 1]) {
					basket.pop_back();
					board[i][move - 1] = 0;
					answer++;
					break;
				}
				basket.emplace_back(board[i][move - 1]);
				board[i][move - 1] = 0;
				break;
			}
		}
	}
	return 2 * answer;
}