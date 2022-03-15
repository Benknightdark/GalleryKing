
const btn = document.querySelector(".mobile-menu-button");
const sidebar = document.querySelector(".sidebar") as HTMLElement;
declare function toggleModal(id: string, show: boolean): any;
// 開啟或關閉左側選單
btn.addEventListener("click", () => {
    sidebar.style['display'] = sidebar.style['display'] === "inherit" ? "none" : "inherit"
});

// 拖曳
function dragover_handler(ev: DragEvent) {
    console.log("dragOver");
    ev.preventDefault();
    const currentTargetClassList = (ev.target as HTMLElement).classList
    currentTargetClassList.add("bg-sky-700")
}
// 拖曳結束
function dragLeave_handler(ev: DragEvent) {
    console.log(" dragLeave");
    ev.preventDefault();
    const currentTargetClassList = (ev.target as HTMLElement).classList
    currentTargetClassList.remove("bg-sky-700")
}

// 檢視照片
$(document).on('click', ".image-data", function (event) {
    console.log( )
    const selectedImage=$(event.currentTarget).attr('src') ;
    $('#image-preview').attr('src',selectedImage)
    toggleModal('imageModal', true);
});