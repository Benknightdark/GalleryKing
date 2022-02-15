// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("load", function (event) {
  (async () => {
    const { ipcRenderer } = require('electron')
    // 新增圖片列表
    const createImageList = (result) => {
      console.log(result)
      folder = result.folder;
      console.log(document.getElementById("imageList"))
      const imageListElement = document.getElementById("imageList");
      imageListElement.innerHTML = '';
      result.data.forEach(element => {
        imageListElement.innerHTML += `
      <div class="w-full rounded">
        <img
          src="${folder}\\${element}"
          alt="image">
      </div> 
      `
      });
    }
    // 新增資料夾列表
    const createFolderList = (result) => {
      const folderListElement = document.getElementById("folderList");
      folderListElement.innerHTML = '';
      result.data.forEach(element => {
        folderListElement.innerHTML += `
        <button aria-current="true" type="button" class="py-2 px-4 w-full text-left text-white
        bg-blue-700 rounded-t-lg border-b border-gray-200 cursor-pointer focus:outline-none 
        dark:bg-gray-800 dark:border-gray-600 browse-images-btn" data-path="${result.folder}//${element}">
         ${element}
       </button>
      `
      });
      const browsImagesBtns = document.getElementsByClassName("browse-images-btn");
      for (var i = 0; i < browsImagesBtns.length; i++) {
        browsImagesBtns[i].addEventListener("click", async function () {
          const result = await ipcRenderer.invoke('browseImage', this.dataset.path)
          createImageList(result)
        })
      }

    }

    // 取得子資料夾
    document.getElementById("browse-btn").addEventListener("click", async () => {
      const result = await ipcRenderer.invoke('browseFolder')//browseImage
      createFolderList(result)
    })



  })()
});
