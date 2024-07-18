document.addEventListener('DOMContentLoaded', function () {
  const openlogo = document.querySelector('.open-logo');
  const closedlogo = document.querySelector('.closed-logo');
  const sidebar = document.querySelector('#navbar');
  const toggle = document.querySelector(".toggle-close");
  const toggleOpen = document.querySelector(".toggle-open");
  const menu = document.querySelector(".menu-bar");
  const searchBtn = document.querySelector(".search-box");
  const catTitles = document.querySelectorAll('.category-titles');
console.log(toggle);
  toggle.addEventListener("click", () => {
    sidebar.classList.remove("close");
    menu.classList.remove("closed-menubar");
    toggle.classList.add("hidden");
    catTitles.forEach((catTitle) => {
      catTitle.classList.remove('hidden');
    });
    openlogo.classList.remove('hidden');
    closedlogo.classList.add('hidden');
    toggleOpen.classList.remove("hidden");
    menu.removeEventListener("mouseover", toggleSidebar, false);
    menu.removeEventListener("mouseout", toggleSidebar1, false);
  });

  toggleOpen.addEventListener("click", () => {
    sidebar.classList.add("close");
    menu.classList.add("closed-menubar");
    toggle.classList.remove("hidden");
    toggleOpen.classList.add("hidden");
    catTitles.forEach((catTitle) => {
      catTitle.classList.add('hidden');
    });
    openlogo.classList.add('hidden');
    closedlogo.classList.remove('hidden');
    menu.addEventListener("mouseover", toggleSidebar, false);
    menu.addEventListener("mouseout", toggleSidebar1, false);
  });

  searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
  });

  function toggleSidebar() {
    const openlogo = document.querySelector('.open-logo');
    const closedlogo = document.querySelector('.closed-logo');
    const catTitles = document.querySelectorAll('.category-titles');

    catTitles.forEach((catTitle) => {
      catTitle.classList.remove('hidden');
    });

    openlogo.classList.remove('hidden');
    closedlogo.classList.add('hidden');
    sidebar.classList.remove("close");
    sidebar.classList.add("fixed-Home");
  }

  function toggleSidebar1() {
    const menu = document.querySelector(".menu-bar");
    const openlogo = document.querySelector('.open-logo');
    const closedlogo = document.querySelector('.closed-logo');
    const catTitles = document.querySelectorAll('.category-titles');

    menu.classList.add("closed-menubar");
    catTitles.forEach((catTitle) => {
      catTitle.classList.add('hidden');
    });

    openlogo.classList.add('hidden');
    closedlogo.classList.remove('hidden');
    sidebar.classList.add("close");
    sidebar.classList.remove("fixed-Home");
  }

  let body = document.querySelector('body');
  let sidebarRight = document.querySelector('#navbar-right');
  let toggleRight = document.querySelector("#toggle-close");
  let toggleOpenRight = document.querySelector("#toggle-open");
  let themeList = document.querySelector(".theme-list");
  let modeSwitch = document.querySelector(".toggle-switch");
  let modeText = document.querySelector(".mode-text");

  toggleRight.addEventListener("click", () => {
    sidebarRight.classList.remove("close");
    toggleRight.classList.add("hidden");
    toggleOpenRight.classList.remove("hidden");
    themeList.classList.remove("hidden");
  });

  toggleOpenRight.addEventListener("click", () => {
    sidebarRight.classList.add("close");
    toggleRight.classList.remove("hidden");
    toggleOpenRight.classList.add("hidden");
    themeList.classList.add("hidden");
  });

  modeSwitch.addEventListener("click", () => {
    body.classList.remove("dark-pink-theme");
    body.classList.remove("orange-theme");
    body.classList.remove("iris-theme");
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      modeText.innerText = "Light mode";
    } else {
      modeText.innerText = "Dark mode";
    }
  });

  const purpleTheme = document.querySelector(".purple");
  const orangeTheme = document.querySelector(".orange");
  const irisTheme = document.querySelector(".iris");

  purpleTheme.addEventListener("click", () => {
    body.classList.add("dark-pink-theme");
    body.classList.remove("orange-theme");
    body.classList.remove("iris-theme");
  });

  orangeTheme.addEventListener("click", () => {
    body.classList.add("orange-theme");
    body.classList.remove("dark-pink-theme");
    body.classList.remove("iris-theme");
  });

  irisTheme.addEventListener("click", () => {
    body.classList.add("iris-theme");
    body.classList.remove("dark-pink-theme");
    body.classList.remove("orange-theme");
  });
});
