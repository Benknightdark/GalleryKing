// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// preload.js - 在畫面轉譯處理序中 (網頁)。
// ipcRenderer.invoke('take-cat-home-handle', '帶小貓回家').then(msg => console.log(msg)) 
(async()=>{
  const { ipcRenderer } = require('electron')

  const result = await ipcRenderer.invoke('my-invokable-ipc', 1, 1)
  console.log(result)
})()