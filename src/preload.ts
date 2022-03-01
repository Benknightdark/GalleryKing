// preload.js

import { ipcRenderer } from "electron";

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("load", function (event) {
    (async () => {
      let currentSelectFolder = ''
    //   const { ipcRenderer } = require('electron')
      // 新增圖片列表
      const createImageList = (result:any) => {
        const folder:any = result.folder;
        const imageListElement = document.getElementById("imageList");
        imageListElement.innerHTML = '';
        result.data.forEach((element:any) => {
          imageListElement.innerHTML += `
        <div class="w-full  rounded relative border-2 border-indigo-600">
           <div class="absolute top-0 right-0">
           <input  type="checkbox"
            data-file="${element}"
            data-path="${folder}\\${element}"
            class="image-checkbox w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 
            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800
             focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
           </div>
            <img
            src="${folder}\\${element}"
            alt="image"/>   
        </div> 
        `
        });
        currentSelectFolder = folder;
      }
      // 新增資料夾列表
      const createFolderList = (result:any) => {
        const folderListElement = document.getElementById("folderList");
        folderListElement.innerHTML = '';
        document.querySelector("title").innerHTML = result.folder
        result.data.forEach((element:any) => {
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
        for (let i = 0; i < browsImagesBtns.length; i++) {
          browsImagesBtns[i].addEventListener("click", async function () {
            const result = await ipcRenderer.invoke('browseImage', this.dataset.path)
            document.querySelector("title").innerHTML = this.dataset.folder
            createImageList(result)
          })
        }
  
      }
      // 取得已選取的圖片
      const getSelectedImages = () => {
        const selectedImage = document.querySelectorAll('.image-checkbox:checked')
        const selectedImageList:any[] = []
        if (selectedImage !== null) {
          selectedImage.forEach((s:any) => {
            selectedImageList.push({ path: s.dataset['path'], file: s.dataset['file'] })
          })
        }
        return selectedImageList
      }
      // 取得子資料夾
      document.getElementById("browse-btn").addEventListener("click", async () => {
        const result = await ipcRenderer.invoke('browseFolder')
        createFolderList(result)
      })
      // 取得資料夾的圖片
      document.getElementById("browse-image-btn").addEventListener("click", async () => {
        const result = await ipcRenderer.invoke('browseImage')
        createImageList(result)
        const sidebar = document.querySelector(".sidebar") as any;
        sidebar.style['display'] = 'none'
        document.querySelector("title").innerHTML = result.folder
      })
      // 回到最上頁
      document.getElementById("scroll-top-btn").addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      // 複製圖片
      document.getElementById('copy-btn').addEventListener('click', async () => {
        const selectedImageList = getSelectedImages();
        if (selectedImageList.length > 0) {
          await ipcRenderer.invoke('copyImages', selectedImageList)
        }
      })
      // 搬移圖片
      document.getElementById('move-btn').addEventListener('click', async () => {
        const selectedImageList = getSelectedImages();
        if (selectedImageList.length > 0) {
          await ipcRenderer.invoke('moveImages', selectedImageList)
          document.querySelectorAll('.image-checkbox:checked').forEach(r => {
            r.parentElement.parentElement.remove();
          })
  
        }
      })
      // 刪除圖片
      document.getElementById('delete-btn').addEventListener('click', async () => {
        const selectedImageList = getSelectedImages();
        if (selectedImageList.length > 0) {
          await ipcRenderer.invoke('deleteImages', selectedImageList)
        }
      })      
      // 切換頁面的圖片
      const changeImageListByNextAndPrev = (page:any) => {
        const title = document.querySelector("title").innerHTML;
        const folderList = document.querySelectorAll('#folderList > a')
        folderList.forEach(async (r:any, i) => {
          if (r.dataset['folder'] === title) {
            const prev:any = folderList[i + page]
            const result = await ipcRenderer.invoke('browseImage', prev.dataset.path)
            document.querySelector("title").innerHTML = prev.dataset.folder
            createImageList(result)
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        })
      }
      // 上一頁
      document.getElementById('prev-btn').addEventListener('click', async () => {
        changeImageListByNextAndPrev(-1)
      })
      // 下一頁
      document.getElementById('next-btn').addEventListener('click', async () => {
        changeImageListByNextAndPrev(1)
      })
    })()
  });