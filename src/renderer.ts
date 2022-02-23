const btn = document.querySelector(".mobile-menu-button");
const sidebar = document.querySelector(".sidebar") as any;
btn.addEventListener("click", () => {
    sidebar.style['display'] = sidebar.style['display']==="inherit"?"none":"inherit"
});