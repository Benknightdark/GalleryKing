// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')
const { } = require('electron')
const fs = require('fs');
const fsPromises = fs.promises;
const notifier = require('node-notifier');

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})



ipcMain.handle('browseImage', async (event, ...args) => {
  console.log(args)
  let folder;
  if (args.length > 0) {
    // 直接開啟資料夾裡的所有圖片
    folder = args[0];
    const data = await fsPromises.readdir(folder);
    const sortData = data.sort((x, y) => x.localeCompare(y, 'zh-TW', { numeric: true }))
    return {
      "folder": folder,
      "data": sortData
    }
  } else {
    // 選擇要開的資料夾裡的圖片
    const dialogCallback = await dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (!dialogCallback.canceled) {
      folder = dialogCallback.filePaths[0];
      const data = await fsPromises.readdir(folder);
      const sortData = data.sort((x, y) => x.localeCompare(y, 'zh-TW', { numeric: true }))
      return {
        "folder": folder,
        "data": sortData
      }
    }
    return {};
  }

})

ipcMain.handle('browseFolder', async (event, ...args) => {
  const dialogCallback = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  if (!dialogCallback.canceled) {
    const folder = dialogCallback.filePaths[0];
    const data = await fsPromises.readdir(folder);
    return {
      "folder": folder,
      "data": data.sort((x, y) => x.localeCompare(y, 'zh-TW', { numeric: true }))
    }
  }
  return {};
})

ipcMain.handle('copyImages', async (event, ...args) => {
  const dialogCallback = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  if (!dialogCallback.canceled) {
    const destinationFolder = dialogCallback.filePaths[0];
    const sourceImages = args[0]
    sourceImages.map(async image => {
      await fsPromises.copyFile(image['path'], destinationFolder + "\\" + image['file']);
    })
  }
  notifier.notify({
    title: 'Gallery King',
    message: '完成複製圖片工作',
    icon: path.join(__dirname, '/assets/icon.png'),
    sound: true,
  });
})

ipcMain.handle('moveImages', async (event, ...args) => {
  const dialogCallback = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  if (!dialogCallback.canceled) {
    const destinationFolder = dialogCallback.filePaths[0];
    const sourceImages = args[0]
    sourceImages.map(async image => {
      await fsPromises.rename(image['path'], destinationFolder + "\\" + image['file']);
    })
  }
  notifier.notify({
    title: 'Gallery King',
    message: '完成搬移圖片工作',
    icon: path.join(__dirname, '/assets/icon.png'),
    sound: true,
  });
})
