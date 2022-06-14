const board = document.querySelector('.board-section');

for (let i = 0; i < 150; i++) {
  let block = '<div class="block"></div>';
  board.innerHTML += block;
}
