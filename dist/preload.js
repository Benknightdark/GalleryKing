"use strict";
// preload.js
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
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("load", function (event) {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var currentSelectFolder, createImageList, createFolderList, getSelectedImages, changeImageListByNextAndPrev;
        var _this = this;
        return __generator(this, function (_a) {
            currentSelectFolder = '';
            createImageList = function (result) {
                var folder = result.folder;
                var imageListElement = document.getElementById("imageList");
                imageListElement.innerHTML = '';
                result.data.forEach(function (element) {
                    imageListElement.innerHTML += "\n        <div class=\"w-full  rounded relative border-2 border-indigo-600\">\n           <div class=\"absolute top-0 right-0\">\n           <input  type=\"checkbox\"\n            data-file=\"".concat(element, "\"\n            data-path=\"").concat(folder, "\\").concat(element, "\"\n            class=\"image-checkbox w-10 h-10 text-blue-600 bg-gray-100 rounded border-gray-300 \n            focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800\n             focus:ring-2 dark:bg-gray-700 dark:border-gray-600\">\n           </div>\n            <img\n            src=\"").concat(folder, "\\").concat(element, "\"\n            alt=\"image\"/>   \n        </div> \n        ");
                });
                currentSelectFolder = folder;
            };
            createFolderList = function (result) {
                var folderListElement = document.getElementById("folderList");
                folderListElement.innerHTML = '';
                document.querySelector("title").innerHTML = result.folder;
                result.data.forEach(function (element) {
                    folderListElement.innerHTML += "\n          <a href=\"#\" class=\"browse-images-btn block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white \" \n          data-path=\"".concat(result.folder, "//").concat(element, "\"\n          data-folder=\"").concat(element, "\">\n          ").concat(element, "\n          </a>   \n        ");
                });
                var sidebar = document.querySelector(".sidebar");
                sidebar.classList.remove("bg-blue-800");
                sidebar.classList.add("bg-blue-800");
                var browsImagesBtns = document.getElementsByClassName("browse-images-btn");
                for (var i = 0; i < browsImagesBtns.length; i++) {
                    browsImagesBtns[i].addEventListener("click", function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, electron_1.ipcRenderer.invoke('browseImage', this.dataset.path)];
                                    case 1:
                                        result = _a.sent();
                                        document.querySelector("title").innerHTML = this.dataset.folder;
                                        createImageList(result);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                }
            };
            getSelectedImages = function () {
                var selectedImage = document.querySelectorAll('.image-checkbox:checked');
                var selectedImageList = [];
                if (selectedImage !== null) {
                    selectedImage.forEach(function (s) {
                        selectedImageList.push({ path: s.dataset['path'], file: s.dataset['file'] });
                    });
                }
                return selectedImageList;
            };
            // 取得子資料夾
            document.getElementById("browse-btn").addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, electron_1.ipcRenderer.invoke('browseFolder')];
                        case 1:
                            result = _a.sent();
                            createFolderList(result);
                            return [2 /*return*/];
                    }
                });
            }); });
            // 取得資料夾的圖片
            document.getElementById("browse-image-btn").addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                var result, sidebar;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, electron_1.ipcRenderer.invoke('browseImage')];
                        case 1:
                            result = _a.sent();
                            createImageList(result);
                            sidebar = document.querySelector(".sidebar");
                            sidebar.style['display'] = 'none';
                            document.querySelector("title").innerHTML = result.folder;
                            return [2 /*return*/];
                    }
                });
            }); });
            // 回到最上頁
            document.getElementById("scroll-top-btn").addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            // 複製圖片
            document.getElementById('copy-btn').addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                var selectedImageList;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            selectedImageList = getSelectedImages();
                            if (!(selectedImageList.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, electron_1.ipcRenderer.invoke('copyImages', selectedImageList)];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
            // 搬移圖片
            document.getElementById('move-btn').addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                var selectedImageList;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            selectedImageList = getSelectedImages();
                            if (!(selectedImageList.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, electron_1.ipcRenderer.invoke('moveImages', selectedImageList)];
                        case 1:
                            _a.sent();
                            document.querySelectorAll('.image-checkbox:checked').forEach(function (r) {
                                r.parentElement.parentElement.remove();
                            });
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            }); });
            changeImageListByNextAndPrev = function (page) {
                var title = document.querySelector("title").innerHTML;
                var folderList = document.querySelectorAll('#folderList > a');
                folderList.forEach(function (r, i) { return __awaiter(_this, void 0, void 0, function () {
                    var prev, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(r.dataset['folder'] === title)) return [3 /*break*/, 2];
                                prev = folderList[i + page];
                                return [4 /*yield*/, electron_1.ipcRenderer.invoke('browseImage', prev.dataset.path)];
                            case 1:
                                result = _a.sent();
                                document.querySelector("title").innerHTML = prev.dataset.folder;
                                createImageList(result);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
            };
            // 上一頁
            document.getElementById('prev-btn').addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    changeImageListByNextAndPrev(-1);
                    return [2 /*return*/];
                });
            }); });
            // 下一頁
            document.getElementById('next-btn').addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    changeImageListByNextAndPrev(1);
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    }); })();
});
//# sourceMappingURL=preload.js.map