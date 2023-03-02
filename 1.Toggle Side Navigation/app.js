const $nav = document.querySelector('.container > nav');
const $toggleBtn = document.querySelector('main > i.toggle');

let isNavActive = false;

window.addEventListener('DOMContentLoaded', () => {
  isNavActive = JSON.parse(localStorage.getItem('isNavActive')) ?? false;

  $nav.classList.toggle('active', isNavActive);

  document.body.style.visibility = 'visible';
});

$toggleBtn.addEventListener('click', () => {
  isNavActive = !isNavActive;

  document.body.classList.remove('preload');

  localStorage.setItem('isNavActive', isNavActive);

  $nav.classList.toggle('active', isNavActive);
});
