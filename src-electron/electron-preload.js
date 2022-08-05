import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('API', {
  send: async (channel, args) => {
    const r = await ipcRenderer.invoke(channel, args)
    return r
  },
  handle: (channel, callable) => {
    ipcRenderer.on(channel, (e, args) => callable(e, args))
  }
})
