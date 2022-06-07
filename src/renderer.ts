
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
    console.log(event.currentTarget)
    $('#image-preview').attr('src', selectedImage)
    // toggleModal('imageModal', true);
    // const modal = new Modal(document.getElementById('imageModal'));
    // modal.toggle();
    document.getElementById('cc').click();
});

const autoShow=async (listIndex:number,childElementCount: number)=>{
    //document.querySelector('#imageList').childElementCount
    for (let i = 0; i <childElementCount+1; i++) {
        (function (x) {
            setTimeout(function () {
                // document.getElementById('cc')?.click();
                (document.querySelector(`#imageList > div:nth-child(${x}) > img`) as HTMLElement).click()
                if (x===childElementCount){
                    ((x1,x2)=>{
                        setTimeout(()=>{
                            console.log('end');
                            (document.querySelectorAll('.browse-images-btn')[listIndex+1] as HTMLElement).click()
                           autoShow (listIndex+1,document.querySelector('#imageList').childElementCount)
                        },1000)
                    })(x,childElementCount)
                }
            }, 3000 * x)
        })(i)
       
    }
}
this.document.getElementById('btnAutoPlay').addEventListener('click', async () => {
    await autoShow(0,document.querySelector('#imageList').childElementCount)
})


