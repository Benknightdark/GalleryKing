// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("load", function (event) {
  (async () => {
    const { ipcRenderer } = require('electron')
    // 新增圖片列表
    const createImageList = (result) => {
      folder = result.folder;
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
      document.querySelector("title").innerHTML = result.folder
      result.data.forEach(element => {
        folderListElement.innerHTML += `
        <a href="#" class="browse-images-btn block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white " 
        data-path="${result.folder}//${element}"
        data-folder="${element}">
        ${element}
        </a>   
      `
      });
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.remove("bg-blue-800")
      sidebar.classList.add("bg-blue-800")
      const browsImagesBtns = document.getElementsByClassName("browse-images-btn");
      for (var i = 0; i < browsImagesBtns.length; i++) {
        browsImagesBtns[i].addEventListener("click", async function () {
          const result = await ipcRenderer.invoke('browseImage', this.dataset.path)
          document.querySelector("title").innerHTML = this.dataset.folder
          createImageList(result)
        })
      }

    }

    // 取得子資料夾
    document.getElementById("browse-btn").addEventListener("click", async () => {
      const result = await ipcRenderer.invoke('browseFolder')
      console.log(result)
      createFolderList(result)
    })
    // 取得資料夾的圖片
    document.getElementById("browse-image-btn").addEventListener("click", async () => {
      const result = await ipcRenderer.invoke('browseImage')
      console.log(result)
      createImageList(result)
      const sidebar = document.querySelector(".sidebar");
      sidebar.style['display'] = 'none'
      document.querySelector("title").innerHTML = result.folder
    })
  })()
});
