const frames = [
  '/material/favicon1.png',
  '/material/favicon2.png',
  '/material/favicon3.png',
  '/material/favicon4.png',
  '/material/favicon3.png',
  '/material/favicon2.png',
];

let index = 0;

setInterval(() => {
  const favicon = document.getElementById('favicon');
  favicon.href = frames[index];
  index = (index + 1) % frames.length;
}, 150);
