// I block matrix
const iBlock = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
];

// O block matrix
const oBlock = [
  [2, 2],
  [2, 2],
];

// T block matrix
const tBlock = [
  [0, 3, 0],
  [3, 3, 0],
  [0, 3, 0],
];

// S block matrix
const sBlock = [
  [4, 0, 0],
  [4, 4, 0],
  [0, 4, 0],
];

// Z block matrix
const zBlock = [
  [0, 5, 0],
  [5, 5, 0],
  [5, 0, 0],
];

// L block matrix
const lBlock = [
  [6, 6, 0],
  [0, 6, 0],
  [0, 6, 0],
];

// J block matrix
const jBlock = [
  [7, 7, 0],
  [7, 0, 0],
  [7, 0, 0],
];

const BLOCKS = [iBlock, jBlock, lBlock, oBlock, sBlock, tBlock, zBlock];

const COLORS = ['#c23616', '#0097e6', '#44bd32', '#e1b12c', '#8c7ae6', '#e84393', '#00cec9'];

const TRANSPARENT = 'transparent';

const DIRECTION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  ROTATE: 'ROTATE',
  DOWN: 'DOWN',
};

// KEY CODE
const KEY = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  P: 80,
};

// BOARD SiZE
const GRID_HEIGHT = 20;
const GRID_WIDTH = 10;

// Start position of block
const START_X = 0;
const START_Y = 4;

// Start speed and score
const START_SCORE = 0;
const START_SPEED = 1000;

const MAIN_SCORE = 100;
const BONUS_SCORE = 30;

// Game state
const GAME_STATE = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  END: 'END',
};
