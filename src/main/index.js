import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { read, write } from './datastore'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    title: "trudbot's tomato",
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  // //窗口关闭时回调， 进行一次保存后才能关闭
  // mainWindow.on('close', (e) => {
  //   if (!mainWindow.saved) {
  //     e.preventDefault()
  //     mainWindow.webContents.send('save-data')
  //   }
  // })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // customer
  //读取数据 对应 ipcRenderer.invoke
  ipcMain.handle('read', async () => {
    return await read()
  })

  //覆写数据
  ipcMain.on('write', async (event, data) => {
    await write(data)
  })

  // //窗口执行保存后的回调， 将对应窗口关闭
  // ipcMain.on('quit', (event) => {
  //   event.sender.saved = true
  //   event.sender.close()
  // })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
