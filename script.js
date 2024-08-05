document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const newGameButton = document.getElementById('new-game');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    const newGameFromResultButton = document.getElementById('new-game-from-result');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const [a, b, c] of winningCombinations) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes(null) ? null : 'T'; // 'T' for Tie
    }

    function handleClick(event) {
        const index = event.target.dataset.index;
        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            showResult(winner);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function showResult(result) {
        if (result === 'T') {
            resultMessage.textContent = "It's a tie!";
        } else {
            resultMessage.textContent = `${result} wins!`;
        }
        resultScreen.classList.remove('hidden');
        newGameButton.classList.add('hidden');
    }

    function resetGame() {
        board = Array(9).fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
        status.textContent = `Player ${currentPlayer}'s turn`;
        resultScreen.classList.add('hidden');
        newGameButton.classList.remove('hidden');
    }

    function startNewGame() {
        resetGame();
        resultScreen.classList.add('hidden');
        newGameButton.classList.add('hidden');
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    resetButton.addEventListener('click', resetGame);
    newGameButton.addEventListener('click', startNewGame);
    newGameFromResultButton.addEventListener('click', startNewGame);

    resetGame(); // Initialize the game status
});
