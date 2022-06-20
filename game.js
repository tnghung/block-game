const field = document.getElementsByClassName('block');
const scoreElement = document.querySelector('#score');
const levelElement = document.querySelector('#level');
const body = document.querySelector('body');
const rsLevelElement = document.querySelector('#result-level');
const rsScoreElement = document.querySelector('#result-score');

// initial new game grid
const newGrid = (width, height) => {
  let grid = new Array(height);
  for (let i = 0; i < height; i++) {
    grid[i] = new Array(width);
  }

  let index = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      grid[i][j] = {
        index: index++,
        value: 0,
      };
    }
  }

  return {
    board: grid,
    width: width,
    height: height,
  };
};

// reset grid and field color
const resetGrid = (grid) => {
  for (let i = 0; i < grid.height; i++) {
    // row
    for (let j = 0; j < grid.width; j++) {
      // col
      grid.board[i][j].value = 0;
    }
  }

  // reset field background
  Array.from(field).forEach((e) => {
    e.style.background = TRANSPARENT;
  });
};

// create new Tetromino
const newTetromino = (blocks, colors, start_x, start_y) => {
  let index = Math.floor(Math.random() * blocks.length);

  return {
    block: blocks[index],
    color: colors[index],
    x: start_x,
    y: start_y,
  };
};

// draw tetromino on field
const drawTetromino = (tetromino, grid) => {
  tetromino.block.forEach((row, i) => {
    row.forEach((value, j) => {
      let x = tetromino.x + i;
      let y = tetromino.y + j;
      if (value > 0) {
        field[grid.board[x][y].index].style.background = tetromino.color;
      }
    });
  });
};

// clear tetromino
const clearTetromino = (tetromino, grid) => {
  tetromino.block.forEach((row, i) => {
    row.forEach((value, j) => {
      let x = tetromino.x + i;
      let y = tetromino.y + j;
      if (value > 0) {
        field[grid.board[x][y].index].style.background = TRANSPARENT;
      }
    });
  });
};

// check tetromino is in grid
const isInGrid = (x, y, grid) => {
  return x < grid.height && x >= 0 && y >= 0 && y < grid.width;
};

// check tetromino is filled or blank
const isFilled = (x, y, grid) => {
  if (!isInGrid(x, y, grid)) {
    return false;
  } else {
    return grid.board[x][y].value !== 0;
  }
};

// check tetromino is movable
const movable = (tetromino, grid, direction = DIRECTION.DOWN) => {
  let newX = tetromino.x;
  let newY = tetromino.y;

  switch (direction) {
    case DIRECTION.DOWN:
      newX = tetromino.x + 1;
      break;
    case DIRECTION.LEFT:
      newY = tetromino.y - 1;
      break;
    case DIRECTION.RIGHT:
      newY = tetromino.y + 1;
      break;
  }

  return tetromino.block.every((row, i) => {
    return row.every((value, j) => {
      let x = newX + i;
      let y = newY + j;
      return value === 0 || (isInGrid(x, y, grid) && !isFilled(x, y, grid));
    });
  });
};

// --------------- Move tetromino ------------------
// move tetromino down
const moveDown = function (tetromino, grid) {
  if (!movable(tetromino, grid, DIRECTION.DOWN)) return;
  clearTetromino(tetromino, grid);
  tetromino.x++;
  drawTetromino(tetromino, grid);
};

// move tetromino left
const moveLeft = function (tetromino, grid) {
  if (!movable(tetromino, grid, DIRECTION.LEFT)) return;
  clearTetromino(tetromino, grid);
  tetromino.y--;
  drawTetromino(tetromino, grid);
};

// move tetromino right
const moveRight = function (tetromino, grid) {
  if (!movable(tetromino, grid, DIRECTION.RIGHT)) return;
  clearTetromino(tetromino, grid);
  tetromino.y++;
  drawTetromino(tetromino, grid);
};

// check rotatable
const rotatable = function (tetromino, grid) {
  // clone block
  let cloneBlock = JSON.parse(JSON.stringify(tetromino.block));

  // rotate clone block
  for (let y = 0; y < cloneBlock.length; y++) {
    for (let x = 0; x < y; ++x) {
      [cloneBlock[x][y], cloneBlock[y][x]] = [cloneBlock[y][x], cloneBlock[x][y]];
    }
  }
  cloneBlock.forEach((row) => row.reverse());

  // check rotated block is visible
  return cloneBlock.every((row, i) => {
    return row.every((value, j) => {
      let x = tetromino.x + i;
      let y = tetromino.y + j;
      return value === 0 || (isInGrid(x, y, grid) && !isFilled(x, y, grid));
    });
  });
};

// rotate tetromino
const rotate = function (tetromino, grid) {
  if (!rotatable(tetromino, grid)) return;
  clearTetromino(tetromino, grid);
  for (let y = 0; y < tetromino.block.length; y++) {
    for (let x = 0; x < y; x++) {
      [tetromino.block[x][y], tetromino.block[y][x]] = [tetromino.block[y][x], tetromino.block[x][y]];
    }
  }
  tetromino.block.forEach((row) => row.reverse());
  drawTetromino(tetromino, grid);
};

// hard drop tetromino
const hardDrop = function (tetromino, grid) {
  clearTetromino(tetromino, grid);
  while (movable(tetromino, grid, DIRECTION.DOWN)) {
    tetromino.x++;
  }
  drawTetromino(tetromino, grid);
};

// update grid when tetromino down
const updateGrid = function (tetromino, grid) {
  tetromino.block.forEach((row, i) => {
    row.forEach((val, j) => {
      let x = tetromino.x + i;
      let y = tetromino.y + j;
      if (val > 0 && isInGrid(x, y, grid)) {
        grid.board[x][y].value = val;
      }
    });
  });
};

// check full row
const checkFullRow = function (row) {
  return row.every((val) => {
    return val.value !== 0;
  });
};

// delete full row
const deleteRow = function (row_index, grid) {
  for (let row = row_index; row > 0; row--) {
    for (let col = 0; col < 10; col++) {
      grid.board[row][col].value = grid.board[row - 1][col].value;
      let value = grid.board[row][col].value;

      // update field
      field[grid.board[row][col].index].style.background = value === 0 ? TRANSPARENT : COLORS[value - 1];
    }
  }
};

// check grid for delete row
const checkGrid = function (grid) {
  grid.board.forEach((row, i) => {
    if (checkFullRow(row)) {
      deleteRow(i, grid);
    }
  });
};

// ------------- Game object ---------------
const Game = {
  score: START_SCORE,
  speed: START_SPEED,
  level: 1,
  state: GAME_STATE.END,
  interval: null,
};

const grid = newGrid(GRID_WIDTH, GRID_HEIGHT);
let tetromino = null;
scoreElement.innerHTML = Game.score;

// -----------------------------------------

// game loop
const gameLoop = function () {
  if (Game.state === GAME_STATE.PLAY) {
    if (movable(tetromino, grid)) {
      moveDown(tetromino, grid);
    } else {
      updateGrid(tetromino, grid);
      checkGrid(grid);
      tetromino = newTetromino(BLOCKS, COLORS, START_X, START_Y);

      // check grid is full -> end game
      if (movable(tetromino, grid)) {
        drawTetromino(tetromino, grid);
      } else {
        Game.state = GAME_STATE.END;
        body.classList.add('end');
        body.classList.remove('play');

        rsLevelElement.innerHTML = Game.level;
        rsScoreElement.innerHTML = Game.score;
      }
    }
  }
};

// game start
const gameStart = function () {
  Game.state = GAME_STATE.PLAY;
  tetromino = newTetromino(BLOCKS, COLORS, START_X, START_Y);

  Game.interval = setInterval(gameLoop, Game.speed);
};

// game pause
const gamePause = function () {
  Game.state = GAME_STATE.PAUSE;
};

// game resume
const gameResume = function () {
  Game.state = GAME_STATE.PLAY;
};

// game reset
const gameReset = function () {
  clearInterval(Game.interval);
  resetGrid(grid);
  Game.score = START_SCORE;
  Game.level - START_SPEED;
  Game.state = GAME_STATE.END;
  Game.level = 1;
  Game.interval = null;
  tetromino = null;
};

// ----------- Add keyboard event ----------------
document.addEventListener('keydown', (e) => {
  e.preventDefault();
  let key = e.keyCode;
  switch (key) {
    case KEY.DOWN: {
      moveDown(tetromino, grid);
      break;
    }
    case KEY.LEFT: {
      moveLeft(tetromino, grid);
      break;
    }
    case KEY.RIGHT: {
      moveRight(tetromino, grid);
      break;
    }
    case KEY.UP: {
      rotate(tetromino, grid);
      break;
    }
    case KEY.SPACE: {
      hardDrop(tetromino, grid);
      break;
    }
    case KEY.P: {
      let btn_play = document.querySelector('#btn-play');
      if (Game.state === GAME_STATE.PAUSE) {
        gamePause();
        body.classList.add('pause');
        body.classList.remove('play');
        btn_play.innerHTML = 'Resume';
      } else {
        body.classList.remove('pause');
        body.classList.add('play');
        gameResume();
      }
    }
  }
});

const btns = document.querySelectorAll('[id*="btn-"]');

btns.forEach((e) => {
  const btn_id = e.getAttribute('id');
  e.addEventListener('click', () => {
    switch (btn_id) {
      case 'btn-down':
        moveDown(tetromino, grid);
        break;
      case 'btn-left':
        moveLeft(tetromino, grid);
        break;
      case 'btn-right':
        moveRight(tetromino, grid);
        break;
      case 'btn-up':
        rotate(tetromino, grid);
        break;
      case 'btn-drop':
        hardDrop(tetromino, grid);
        break;
      case 'btn-play': {
        body.classList.add('play');
        if (Game.state === GAME_STATE.PAUSE) {
          body.classList.remove('pause');
          gameResume();
          return;
        }
        gameStart();
        break;
      }
      case 'btn-theme': {
        body.classList.toggle('dark');
        break;
      }
      case 'btn-help': {
        const how_to = document.querySelector('.how-to');
        how_to.classList.toggle('active');
        break;
      }
      case 'btn-pause': {
        gamePause();
        const btn_play = body.querySelector('#btn-play');
        btn_play.textContent = 'Resume';
        body.classList.remove('play');
        body.classList.add('pause');
        break;
      }
      case 'btn-new-game': {
        gameReset();
        body.classList.add('play');
        body.classList.remove('pause');
        gameStart();
        break;
      }
    }
  });
});
