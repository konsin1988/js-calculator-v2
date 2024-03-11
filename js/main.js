const switcherTheme = document.querySelectorAll(".switcher-svg");
const bottom = document.querySelector(".bottom");
const main = document.querySelector("main");

switcherTheme[0].addEventListener("click", addSunTheme);
switcherTheme[1].addEventListener("click", addMoonTheme);

function addSunTheme() {
  main.className = "main light-theme";
}

function addMoonTheme() {
  main.className = "main dark-theme";
}
