import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'flowbite';


const App = () => <div className="relative min-h-screen">
  <div className="bg-gray-800 text-gray-100 flex justify-between fixed top-0 left-0 right-0 z-50">
    <a href="#" className="block p-4 text-white font-bold">Gallery King</a>
    <a href="#" className="text-white flex items-center space-x-2 px-4" id="browse-btn">
      <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
      </svg>
      <span className="text-xl font-extrabold">打開資料夾</span>
    </a>
    <a href="#" className="text-white flex items-center space-x-2 px-4" id="browse-image-btn">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clip-rule="evenodd" />
      </svg>
      <span className="text-xl font-extrabold" onClick={async ()=>{
        // const result = await ipcRenderer.invoke('browseImage')
        // console.log(result)
      }}>打開圖片</span>
    </a>
    <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
  <div className="pb-10"></div>
  <div className="flex  flex-nowrap">
    <div className="sidebar  text-blue-100 w-64 space-y-1 py-3 px-2
   inset-y-4 left-0 transform  relative translate-x-0 
  transition duration-200 ease-in-out" style={{ display: "inherit" }}>
      <nav id="folderList">
      </nav>
    </div>
    <div className="flex-1 p-5 text-2xl font-bold">
      <div className="container grid grid-cols-1 xl:grid-cols-3 md:grid-cols-3 2xl:grid-cols-3  gap-2 mx-auto"
        id="imageList">
      </div>
    </div>
  </div>
  <div className="pt-10"></div>
  <div className=" text-gray-100 flex justify-end fixed bottom-0 left-0 right-0">
    <div id="tooltip-default" role="tooltip"
      className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
      回到最上面
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="tooltip-config" role="tooltip"
      className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
      設定
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="tooltip-next" role="tooltip"
      className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
      下一個資料夾
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
    <div id="tooltip-prev" role="tooltip"
      className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700">
      上一個資料夾
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
    <button className="p-4 focus:outline-none bg-blue-300 focus:bg-blue-700 hover:bg-blue-500"
      data-modal-toggle="walletModal" data-tooltip-target="tooltip-config" id="config-btn">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
          clip-rule="evenodd" />
      </svg>
    </button>
    <button className="p-4 focus:outline-none bg-green-300 focus:bg-green-700 hover:bg-green-500"
      data-tooltip-target="tooltip-prev" id="prev-btn">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
    </button>
    <button className="p-4 focus:outline-none bg-green-300 focus:bg-green-700 hover:bg-green-500"
      data-tooltip-target="tooltip-next" id="next-btn">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
    <button className="p-4 focus:outline-none bg-red-300 focus:bg-red-700 hover:bg-red-500"
      data-tooltip-target="tooltip-default" id="scroll-top-btn">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
      </svg>
    </button>
  </div>
</div>



ReactDOM.render(
  <App />,
  document.getElementById('root')
);