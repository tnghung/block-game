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
