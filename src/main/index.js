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

function createWindow (winURL) {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 1000,
    useContentSize: true,
    width: 1440
  })
  mainWindow.loadURL(winURL)
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/editor`
    : `file://${__dirname}/index.html`

  createWindow(winURL)
})

ipcMain.on('localPanoPath', (event, path) => {
  console.log(path)

  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/editor`
    : `file://${__dirname}/editor.html`

  createWindow(winURL)
  const contents = mainWindow.webContents

  // mainWindow.webContents.openDevTools()

  contents.on('did-finish-load', () => {
    contents.send('openXml', path)
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
