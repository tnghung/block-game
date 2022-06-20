const field = document.querySelectorAll('.block');

console.log(field);

// Init new game grid function
const newGrid = function (width, height) {
  // Make a[][] array
  const grid = new Array(height);
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

// Reset grid and reset field color
const resetGrid = function (grid) {
  // rows
  for (let i = 0; i < grid.height; i++) {
    // columns
    for (let j = 0; j < grid.width; j++) {
      grid.board[i][j].value = 0;
    }
  }

  // Reset field background
  Array.from(field).forEach((e) => {
    e.style.background = TRANSPARENT;
  });
};

// Create new block function
const newTetromino = function (blocks, colors, start_x, start_y) {
  let index = Math.floor(Math.random() * blocks.length);

  return {
    block: JSON.parse(JSON.stringify(blocks[index])),
    color: colors[index],
    x: start_x,
    y: start_y,
  };
};

// Draw block on field
const drawTetromino = function (tetromino, grid) {
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

// Clear block on field
const clearTetromino = function (tetromino, grid) {
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

// Move block down
const moveDown = function (block, grid) {
  clearTetromino(block, grid);
  block.x++;
  drawTetromino(block, grid);
};

// Check block is touch bottom?

// --------- Demo ----------
let grid = newGrid(GRID_WIDTH, GRID_HEIGHT);
let blockGame = newTetromino(BLOCKS, COLORS, START_X, START_Y);

drawTetromino(blockGame, grid);

setInterval(() => moveDown(blockGame, grid), 500);

const btns = document.querySelectorAll('[id*="btn-"]');

btns.forEach((e) => {
  const btn_id = e.getAttribute('id');
  const body = document.querySelector('body');
  e.addEventListener('click', () => {
    switch (btn_id) {
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
