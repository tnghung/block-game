let field = document.getElementsByClassName('block');

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

// check point is in grid
const isInGrid = (x, y, grid) => {
  return x < grid.height && x >= 0 && y >= 0 && y < grid.width;
};

// check point is filled or blank
const isFilled = (x, y, grid) => {
  if (!isInGrid(x, y, grid)) {
    return false;
  } else {
    return grid.board[x][y].value !== 0;
  }
};

// check tetromino is movable
const movable = (tetromino, grid, direction) => {
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

// --------------- Move tertromino ------------------
// move tertromino down
const moveDown = function (tertromino, grid) {
  if (!movable(tertromino, grid, DIRECTION.DOWN)) return;
  clearTetromino(tertromino, grid);
  tertromino.x++;
  drawTetromino(tertromino, grid);
};

// move tertromino left
const moveLeft = function (tertromino, grid) {
  if (!movable(tertromino, grid, DIRECTION.LEFT)) return;
  clearTetromino(tertromino, grid);
  tertromino.y--;
  drawTetromino(tertromino, grid);
};

// move tertromino right
const moveRight = function (tertromino, grid) {
  if (!movable(tertromino, grid, DIRECTION.RIGHT)) return;
  clearTetromino(tertromino, grid);
  tertromino.y++;
  drawTetromino(tertromino, grid);
};

// check rotatable
const rotatable = (tetromino, grid) => {
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

// rotate tertromino
const rotate = function (tertromino, grid) {
  if (!rotatable(tertromino, grid)) return;
  clearTetromino(tertromino, grid);
  for (let y = 0; y < tertromino.block.length; y++) {
    for (let x = 0; x < y; x++) {
      [tertromino.block[x][y], tertromino.block[y][x]] = [tertromino.block[y][x], tertromino.block[x][y]];
    }
  }
  tetromino.block.forEach((row) => row.reverse());
  drawTetromino(tertromino, grid);
};

const grid = newGrid(GRID_WIDTH, GRID_HEIGHT);
const tetromino = newTetromino(BLOCKS, COLORS, START_X, START_Y);
drawTetromino(tetromino, grid);

setInterval(() => moveDown(tetromino, grid), 200);

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
  }
});

const btns = document.querySelectorAll('[id*="btn-"]');

btns.forEach((e) => {
  const btn_id = e.getAttribute('id');
  const body = document.querySelector('body');
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
      case 'btn-play': {
        body.classList.add('play');
        if (body.classList.contains('pause')) {
          body.classList.remove('pause');
        }
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
        const btn_play = body.querySelector('#btn-play');
        btn_play.textContent = 'Resume';
        body.classList.remove('play');
        body.classList.add('pause');
        break;
      }
      case 'btn-new-game': {
        body.classList.add('play');
        body.classList.remove('pause');
        break;
      }
    }
  });
});
