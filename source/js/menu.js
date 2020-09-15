function setup_navigation() {

  var navMain = document.querySelector('.navigation');
  var navButton = document.querySelector('.navigation__button');

  navMain.classList.remove('navigation--nojs');
  navMain.classList.remove('navigation--opened');
  navMain.classList.add('navigation--closed');

  navButton.onclick = function() {
    if (navMain.classList.contains('navigation--closed')) {
      navMain.classList.remove('navigation--closed');
      navMain.classList.add('navigation--opened');
      navButton.setAttribute('aria-label', 'Открыть меню');
    } else {
      navMain.classList.remove('navigation--opened');
      navMain.classList.add('navigation--closed');
      navButton.setAttribute('aria-label', 'Закрыть меню')
    }
  };
}

window.onload = setup_navigation;
