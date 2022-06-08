
const btn = document.querySelector(".mobile-menu-button");
const sidebar = document.querySelector(".sidebar") as HTMLElement;
declare function toggleModal(id: string, show: boolean): any;
declare let Modal: any;
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
    const selectedImage = $(event.currentTarget).attr('src');
    $('#image-preview').attr('src', selectedImage)
    document.getElementById('cc').click();
});
const clearAllTimeouts = () => {
    let id = window.setTimeout(null, 0);
    while (id--) {
        window.clearTimeout(id);
    }
}
const autoShow = async (listIndex: number) => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    const childElementCount = document.querySelector('#imageList').childElementCount
    console.log(listIndex, childElementCount);
    (document.querySelector(`#imageList > div:nth-child(${1}) > img`) as HTMLElement).click()                 

    for (let i = 2; i < childElementCount + 1; i++) {
        (function (x) {
            setTimeout(function () {
                try {
                    const currentImg=$((document.querySelector(`#imageList > div:nth-child(${x}) > img`))).attr('src');
                    $('#image-preview').attr('src',currentImg);
                    if (x === childElementCount) {
                        ((newListIndex) => {
                            setTimeout(async () => {
                                console.log('end');
                               document.getElementById('cc').click();
                                (document.querySelectorAll('.browse-images-btn')[newListIndex + 1] as HTMLElement).click();
                                clearAllTimeouts();
                                autoShow(newListIndex + 1);
                            }, 1000)
                        })(listIndex)
                    }
                } catch (error) {
                    console.error(error)
                }
            }, 500 * x)
        })(i)

    }
}
this.document.getElementById('btnAutoPlay').addEventListener('click', async () => {
    await autoShow(0)
})


