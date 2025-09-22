// script.js
const fab = document.getElementById('fab-main');
const menu = document.getElementById('fab-menu');
const menuItems = menu.querySelectorAll('.fab-menu-item');

function openMenu() {
  fab.classList.add('open');
  fab.setAttribute('aria-expanded', 'true');
  menu.setAttribute('aria-hidden', 'false');
  menuItems[0].focus();
}
function closeMenu() {
  fab.classList.remove('open');
  fab.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  fab.focus();
}
fab.addEventListener('click', () => {
  const isOpen = menu.getAttribute('aria-hidden') === 'false';
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});
fab.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && menu.getAttribute('aria-hidden') === 'true') {
    e.preventDefault();
    openMenu();
  }
});
menu.addEventListener('keydown', (e) => {
  const idx = Array.from(menuItems).indexOf(document.activeElement);
  if (e.key === 'Escape') {
    closeMenu();
  } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    menuItems[(idx + 1) % menuItems.length].focus();
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    menuItems[(idx - 1 + menuItems.length) % menuItems.length].focus();
  }
});
document.addEventListener('mousedown', (e) => {
  if (!fab.contains(e.target) && !menu.contains(e.target)) {
    closeMenu();
  }
});
