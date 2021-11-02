(function () {

  const sidebarOpenedClass = 'open';

  const togglerMenu = document.querySelector('.header__hamburger'),
        sidebarMenu = document.querySelector('.wrapper__sidebar');

  function main () {
    togglerMenu.addEventListener('click', () => toggleSidebarMenu(), false);
  }


  function toggleSidebarMenu (force) {
    sidebarMenu.classList.toggle(sidebarOpenedClass, arguments.length ? force : undefined);
  }


  function isSidebarOpened () {
    return sidebarMenu.classList.contains(sidebarOpenedClass);
  }

  main();

})();