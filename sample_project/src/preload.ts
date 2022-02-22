import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('bridge', {
  browseImage: async (args: any | null=null) => {
    if (args !== null) {
      return await ipcRenderer.invoke('browseImage', ...args)
    } else {
      return await ipcRenderer.invoke('browseImage')
    }
  },
}
)

console.log('preload tttttttttttttttttt=============================')