// grab everything we need
const btn = document.querySelector(".mobile-menu-button");
const sidebar = document.querySelector(".sidebar");

// add our event listener for the click
btn.addEventListener("click", () => {
    // sidebar.classList.toggle("-translate-x-full");
    console.log(sidebar.style['display'])
    sidebar.style['display'] = sidebar.style['display']==='inherit'?"none":"inherit"

});