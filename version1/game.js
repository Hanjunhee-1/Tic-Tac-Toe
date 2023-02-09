let playerText = document.getElementById('player-text');
let restartButton = document.getElementById('restart-button');
let container = document.getElementById('container');

// 가상선택자 중에서 --winning-blocks 를 가져옵니다.
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

// Array 객체를 통해 box 들을 배열로 만들어줍니다.
let boxes = Array.from(document.getElementsByClassName('box'));

const O_TEXT = 'O';
const X_TEXT = 'X';
let currentPlayer = X_TEXT;

// 게임이 끝났음에도 계속 진행되는 것을 막기 위한 flag 값입니다.
let end = false;

// Array 를 null 로 초기화합니다.
let spaces = Array(9).fill(null);


// bingo 인 상황에 대한 list 입니다.
const bingo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

// 플레이어가 bingo 를 맞췄는지 판별합니다.
const checkBingo = () => {
    for (const condition of bingo) {
        let [a, b, c] = condition;

        // 만약 condition 이 [0, 1, 2] 라면
        // a = 0, b = 1, c = 2 가 됩니다.
        // spaces[0] 이 존재하고
        // spaces[0] 과 spaces[1], 그리고 spaces[2] 가 같아야지만
        // bingo 줄을 반환합니다.
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c];
        }
    }
    return [];
}

// 게임을 초기화합니다.
const resetGame = () => {
    // 배열을 전부 null 로 초기화합니다.
    spaces.fill(null);

    // html 에서 받아온 box 들의 innerText 를 다시 빈 칸으로 만들어줍니다.
    boxes.forEach((box) => {
        box.innerText = '';
        box.style.backgroundColor = '';
    })

    playerText.innerHTML = 'Tic Tac Toe';
    currentPlayer = X_TEXT;

    end = false;
}

// 플레이어가 칸을 클릭했을 때에 대한 처리를 하는 함수입니다.
const boxClicked = (e) => {
    const id = e.target.id;

    // 만약 누른 곳이 빈칸이라면 배열에서 해당 부분을 현재 플레이어의 기호로 저장하고
    // 화면 상으로 현재 플레이어의 기호를 나타내줍니다.
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        const bingo = checkBingo();

        // 현재 플레이어가 bingo 를 맞췄는지 확인합니다.
        // bingo 의 length 가 0이라면 맞춰진 빙고가 없는 것이기 때문에 실행하지 않습니다.
        if (bingo.length !== 0 && !end) {
            playerText.innerHTML = `${currentPlayer} 플레이어가 이겼습니다!!`;
            bingo.map((index) => {
                boxes[index].style.backgroundColor = winnerIndicator;
            })

            // 게임이 끝났는데도 완벽하게 끝나지 않는 것을 방지하기 위해 end 를 true 로 바꿔줍니다.
            end = true;
        }

        // 한 플레이어만 계속 누를 수 없기 때문에 검사를 하여 바꿔줍니다.
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    } else {
        alert('해당 칸은 클릭할 수 없습니다.');
    }
}

// 게임을 시작합니다.
const startGame = () => {
    // map() 을 써도 되지 않을까? 라는 생각이 들겠지만
    // map() 은 배열을 순회한 뒤 그것들을 다 합쳐서 배열을 반환하기 때문에
    // 오로지 순회만 하는 forEach() 를 사용하는 것이 적절합니다.
    // box 를 클릭할 때 boxClicked() 함수를 실행합니다.
    boxes.forEach((box) => box.addEventListener('click', boxClicked));
}


// Restart 버튼을 클릭할 시에 resetGame() 함수를 실행합니다.
restartButton.addEventListener('click', resetGame);

startGame();