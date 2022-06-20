const board = document.querySelector('.board-section');
const container = document.querySelector('.container');
const loading_square = document.querySelector('.square');

for (let i = 0; i < 200; i++) {
  let block = '<div class="block"></div>';
  board.innerHTML += block;
}

const fall = function () {
  const fall_count = 50;
  for (let i = 0; i <= fall_count; i++) {
    // Get random img from assets
    const img_index = Math.floor(Math.random() * 6) + 1;

    // Get random (x,y) in web browser
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);

    // Get random style
    const size = Math.random() * 40;
    const duration = Math.random() * 70 + 30;

    // Make and style for img element
    const img = document.createElement('img');

    img.className = 'fall';
    img.src = 'assets/images/' + img_index + '.png';

    img.style.width = 1 + size + 'px';
    img.style.height = 'auto';

    img.style.left = x + 'px';
    img.style.bottom = y + 'px';

    img.style.animationDuration = 2 + duration + 's';

    container.appendChild(img);
  }
};

// Make a square block loading with  matrix 4x4
for (let i = 1; i <= 16; i++) {
  loading_square.innerHTML += '<div></div>';
}

fall();
