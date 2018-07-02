'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow

const winURL = process.env.NODE_ENV === 'development'
  ? `file:///Users/bigfly/Documents/code/my/krpano-editor/dist/electron/index.html`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 1000,
    useContentSize: true,
    width: 1440
  })
  mainWindow.loadURL(winURL)
  // mainWindow.loadURL('file:///Users/bigfly/Documents/code/my/krpano-editor/dist/electron/index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

ipcMain.on('url', (evt, data) => {
  console.log(data)
  let krpanoWindow = new BrowserWindow({
    height: 1000,
    useContentSize: true,
    width: 1440
  })

  krpanoWindow.loadURL(`file://${data[0]}`)
  // krpanoWindow.loadURL('file:///Users/bigfly/Desktop/%E6%9F%A5%E5%85%8B%E6%8B%89%E5%B0%81%E5%8D%B0%E5%BA%93/test.html')

  krpanoWindow.on('closed', () => {
    krpanoWindow = null
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
