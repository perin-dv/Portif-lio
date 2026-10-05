const dialog = document.getElementById('media-player-dialog');
const player = document.getElementById('media-player');
const heading = document.getElementById('media-player-title');
if (dialog && typeof dialog.showModal === 'function') {
  document.querySelectorAll('.media-watch').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      heading.textContent = link.dataset.title;
      player.poster = link.dataset.poster;
      player.src = link.dataset.video;
      dialog.showModal();
    });
  });
  dialog.querySelector('.media-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    player.pause();
    player.removeAttribute('src');
    player.removeAttribute('poster');
    player.load();
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
}
