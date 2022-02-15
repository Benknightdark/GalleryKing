// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("load", function (event) {
  (async () => {
    const { ipcRenderer } = require('electron')
    const createImageList = (result) => {
      // const folder = "C:\\Users\\smart\\Dropbox\\NewIG2\\candice0723"
      // const result = await ipcRenderer.invoke('my-invokable-ipc', folder)
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
    document.getElementById("browse-btn").addEventListener("click", async () => {
      const result = await ipcRenderer.invoke('browseFolder')
      createImageList(result)
    })

  })()
});
