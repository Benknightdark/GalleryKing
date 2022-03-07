const btn = document.querySelector(".mobile-menu-button");
const sidebar = document.querySelector(".sidebar") as HTMLElement;
btn.addEventListener("click", () => {
    sidebar.style['display'] = sidebar.style['display'] === "inherit" ? "none" : "inherit"
});
function dragover_handler(ev: DragEvent) {
    console.log("dragOver");
    ev.preventDefault();
    const currentTargetClassList=(ev.target as HTMLElement).classList
    currentTargetClassList.add("bg-sky-700")
}
function dragLeave_handler(ev: DragEvent) {
    console.log(" dragLeave");
    ev.preventDefault();
    const currentTargetClassList=(ev.target as HTMLElement).classList
    currentTargetClassList.remove("bg-sky-700")
}
