import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import * as notifier from 'node-notifier'
import * as path from 'path';
import * as fs from 'fs';
import * as isDev from 'electron-is-dev'
const fsPromises = fs.promises;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../src/index.html'));
  if (isDev) {
    mainWindow.webContents.openDevTools();
    console.log('Running in development');
  } else {
    console.log('Running in production');
  }
  // Open the DevTools.
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// 判斷檔案路徑是否為資料夾
const checkIsDirectory = async (path: string):Promise<boolean> => {
  const fsStat=await fsPromises.stat(path)
  return  fsStat.isDirectory()
}
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// 開啟圖片
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
  }
  return {};
})

// 開啟資料夾
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

// 複製圖片
ipcMain.handle('copyImages', async (event, ...args) => {
  const dialogCallback = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  if (!dialogCallback.canceled) {
    const destinationFolder = dialogCallback.filePaths[0];
    const sourceImages = args[0]
    sourceImages.map(async (image: any) => {
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

// 移動圖片
ipcMain.handle('moveImages', async (event, ...args) => {
  const dialogCallback = await dialog.showOpenDialog({ properties: ['openDirectory'] });
  if (!dialogCallback.canceled) {
    const destinationFolder = dialogCallback.filePaths[0];
    const sourceImages = args[0]
    sourceImages.map(async (image: any) => {
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

// 刪除圖片
ipcMain.handle('deleteImages', async (event, ...args) => {
  console.log(args)
  args[0].map(async (image: any) => {
    await fsPromises.rm(image.path);
  })
})

// 取得應用程式名稱和版本
ipcMain.handle('getAppInfo', async (event, ...args) => {
  return {
    appName: app.getName(),
    version: app.getVersion()
  }
})

ipcMain.handle('dropAction', async (event, ...args) => {
  const checkIsFolder=await checkIsDirectory(args[0]);
  console.log(checkIsFolder)
})