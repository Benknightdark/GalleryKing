"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var electron_1 = require("electron");
var notifier = require("node-notifier");
var path = require("path");
var fs = require("fs");
var fsPromises = fs.promises;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    electron_1.app.quit();
}
var createWindow = function () {
    // Create the browser window.
    var mainWindow = new electron_1.BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, '../src/index.html'));
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
electron_1.ipcMain.handle('browseImage', function (event) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var folder, data, sortData, dialogCallback, data, sortData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log(args);
                    if (!(args.length > 0)) return [3 /*break*/, 2];
                    // 直接開啟資料夾裡的所有圖片
                    folder = args[0];
                    return [4 /*yield*/, fsPromises.readdir(folder)];
                case 1:
                    data = _a.sent();
                    sortData = data.sort(function (x, y) { return x.localeCompare(y, 'zh-TW', { numeric: true }); });
                    return [2 /*return*/, {
                            "folder": folder,
                            "data": sortData
                        }];
                case 2: return [4 /*yield*/, electron_1.dialog.showOpenDialog({ properties: ['openDirectory'] })];
                case 3:
                    dialogCallback = _a.sent();
                    if (!!dialogCallback.canceled) return [3 /*break*/, 5];
                    folder = dialogCallback.filePaths[0];
                    return [4 /*yield*/, fsPromises.readdir(folder)];
                case 4:
                    data = _a.sent();
                    sortData = data.sort(function (x, y) { return x.localeCompare(y, 'zh-TW', { numeric: true }); });
                    return [2 /*return*/, {
                            "folder": folder,
                            "data": sortData
                        }];
                case 5: return [2 /*return*/, {}];
            }
        });
    });
});
electron_1.ipcMain.handle('browseFolder', function (event) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var dialogCallback, folder, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, electron_1.dialog.showOpenDialog({ properties: ['openDirectory'] })];
                case 1:
                    dialogCallback = _a.sent();
                    if (!!dialogCallback.canceled) return [3 /*break*/, 3];
                    folder = dialogCallback.filePaths[0];
                    return [4 /*yield*/, fsPromises.readdir(folder)];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, {
                            "folder": folder,
                            "data": data.sort(function (x, y) { return x.localeCompare(y, 'zh-TW', { numeric: true }); })
                        }];
                case 3: return [2 /*return*/, {}];
            }
        });
    });
});
electron_1.ipcMain.handle('copyImages', function (event) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var dialogCallback, destinationFolder_1, sourceImages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, electron_1.dialog.showOpenDialog({ properties: ['openDirectory'] })];
                case 1:
                    dialogCallback = _a.sent();
                    if (!dialogCallback.canceled) {
                        destinationFolder_1 = dialogCallback.filePaths[0];
                        sourceImages = args[0];
                        sourceImages.map(function (image) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fsPromises.copyFile(image['path'], destinationFolder_1 + "\\" + image['file'])];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    notifier.notify({
                        title: 'Gallery King',
                        message: '完成複製圖片工作',
                        icon: path.join(__dirname, '/assets/icon.png'),
                        sound: true
                    });
                    return [2 /*return*/];
            }
        });
    });
});
electron_1.ipcMain.handle('moveImages', function (event) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var dialogCallback, destinationFolder_2, sourceImages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, electron_1.dialog.showOpenDialog({ properties: ['openDirectory'] })];
                case 1:
                    dialogCallback = _a.sent();
                    if (!dialogCallback.canceled) {
                        destinationFolder_2 = dialogCallback.filePaths[0];
                        sourceImages = args[0];
                        sourceImages.map(function (image) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, fsPromises.rename(image['path'], destinationFolder_2 + "\\" + image['file'])];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    }
                    notifier.notify({
                        title: 'Gallery King',
                        message: '完成搬移圖片工作',
                        icon: path.join(__dirname, '/assets/icon.png'),
                        sound: true
                    });
                    return [2 /*return*/];
            }
        });
    });
});
//# sourceMappingURL=index.js.map