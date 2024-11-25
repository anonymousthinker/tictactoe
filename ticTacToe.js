const VALID_MOVE = '123456789';

function isValidInput(playerInputs, userInput) {
  for (let index = 0; index < playerInputs.length; index++) {
    if (userInput === playerInputs[index]) {
      return false;
    }
  }

  return true;
}

function isAllThreeSame(board, boxOne, boxTwo, boxThree) {
  return board[boxOne] === board[boxTwo] && board[boxTwo] === board[boxThree];
}

function endingTheGame(board) {
  if (isAllThreeSame(board, 1, 5, 9)) {
    return true;
  }

  if (isAllThreeSame(board, 25, 29, 33)) {
    return true;
  }

  if (isAllThreeSame(board, 49, 53, 57)) {
    return true;
  }

  if (isAllThreeSame(board, 1, 29, 57)) {
    return true;
  }

  if (isAllThreeSame(board, 9, 29, 49)) {
    return true;
  }

  if (isAllThreeSame(board, 1, 25, 49)) {
    return true;
  }

  if (isAllThreeSame(board, 5, 29, 53)) {
    return true;
  }

  if (isAllThreeSame(board, 9, 33, 57)) {
    return true;
  }
  
  return false;
}

function takePlayerInput(playerNumber, playerInputs) {
  const userInput = prompt('Enter move player ' + playerNumber + ': ');
 
  for (let index = 0; index < VALID_MOVE.length; index++) {
    if (userInput === VALID_MOVE[index] && isValidInput(playerInputs, userInput)) {
      return userInput;
    }
  }

  return takePlayerInput(playerNumber, playerInputs);
}

function updateBoardContents(playerNumber, userInput, board, index) {
  if (userInput === board[index]) {
    return playerNumber === 1 ? '⏺' : '✖';
  }

  return board[index];
}

function updateBoard(board, userInput, playerNumber) {
  let updatedBoard = '';
  
  for (let index = 0; index < board.length; index++) {
    updatedBoard += updateBoardContents(playerNumber, userInput, board, index);
  }

  return updatedBoard;
}

function drawBoard() {
  let board = ' 1 ' + '┃' + ' 2 ' + '┃' + ' 3 \n';
  board += '━━━' + '╋' + '━━━' + '╋' + '━━━\n';
  board += ' 4 ' + '┃' + ' 5 ' + '┃' + ' 6 \n';
  board += '━━━' + '╋' + '━━━' + '╋' + '━━━\n';
  board += ' 7 ' + '┃' + ' 8 ' + '┃' + ' 9 \n';

  return board;
}

function doBeforeGameStart() {
  let board = drawBoard();
  let playerInputs = '';

  while (!endingTheGame(board)) {
    const userInputOne = takePlayerInput(1, playerInputs);
    board = updateBoard(board, userInputOne, 1);
    console.clear();
    console.log(board);

    if (endingTheGame(board)) {
      return 'Player One Wins!';
    }
    
    if (playerInputs.length === 8) {
      return 'Its draw';
    }

    playerInputs += isValidInput(playerInputs, userInputOne) ? userInputOne : '';

    const userInputTwo = takePlayerInput(2, playerInputs);
    board = updateBoard(board, userInputTwo, 2);
    console.clear();
    console.log(board);

    playerInputs += isValidInput(playerInputs, userInputTwo) ? userInputTwo : '';
  }

  return 'Player Two Wins!';
}

console.log(drawBoard());
console.log(doBeforeGameStart())