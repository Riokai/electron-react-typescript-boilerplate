import { app, BrowserWindow, Menu, shell } from 'electron'

let menu
let template: Electron.MenuItemConstructorOptions[]
let mainWindow: Electron.BrowserWindow

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support') // eslint-disable-line
  sourceMapSupport.install()
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')() // eslint-disable-line global-require
  const path = require('path') // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules') // eslint-disable-line
  require('module').globalPaths.push(p) // eslint-disable-line
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

const installExtensions = () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer') // eslint-disable-line global-require

    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS

    return Promise.all(
      extensions.map(name => installer.default(installer[name], forceDownload))
    )
  }

  return Promise.resolve([])
}

app.on('ready', () =>
  installExtensions().then(() => {
    mainWindow = new BrowserWindow({
      show: false,
      width: 1024,
      height: 728,
    })

    mainWindow.loadURL(`file://${__dirname}/app.html`)

    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.show()
      mainWindow.focus()
    })

    mainWindow.on('closed', () => {
      // mainWindow = null
    })

    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools()
      mainWindow.webContents.on('context-menu', (e, props) => {
        const { x, y } = props

        Menu.buildFromTemplate([
          {
            label: 'Inspect element',
            click() {
              mainWindow.webContents.inspectElement(x, y)
            }
          }
        ]).popup(mainWindow)
      })
    }

    if (process.platform === 'darwin') {
      const appMenu: Electron.MenuItemConstructorOptions = {
        label: name,
        submenu: [
          { label: `About ${name}`, role: "orderFrontStandardAboutPanel" },
          { type: "separator" },
          { label: `Hide ${name}`, accelerator: "Command+H", role: "hide" },
          { label: "Hide Others", accelerator: "Command+Option+H", role: "hideOtherApplications" },
          { label: "Show All", role: "unhideAllApplications" },
          { type: "separator" },
        ],
      }

      template = [appMenu]

      menu = Menu.buildFromTemplate(template)
      Menu.setApplicationMenu(menu)
    } else {
      template = [
        {
          label: '&File',
          submenu: [
            {
              label: '&Open',
              accelerator: 'Ctrl+O'
            },
            {
              label: '&Close',
              accelerator: 'Ctrl+W',
              click() {
                mainWindow.close()
              }
            }
          ]
        },
        {
          label: '&View',
          submenu:
            process.env.NODE_ENV === 'development'
              ? [
                  {
                    label: '&Reload',
                    accelerator: 'Ctrl+R',
                    click() {
                      mainWindow.webContents.reload()
                    }
                  },
                  {
                    label: 'Toggle &Full Screen',
                    accelerator: 'F11',
                    click() {
                      mainWindow.setFullScreen(!mainWindow.isFullScreen())
                    }
                  },
                  {
                    label: 'Toggle &Developer Tools',
                    accelerator: 'Alt+Ctrl+I',
                    click() {
                      mainWindow.webContents.toggleDevTools()
                    }
                  }
                ]
              : [
                  {
                    label: 'Toggle &Full Screen',
                    accelerator: 'F11',
                    click() {
                      mainWindow.setFullScreen(!mainWindow.isFullScreen())
                    }
                  }
                ]
        },
        {
          label: 'Help',
          submenu: [
            {
              label: 'Learn More',
              click() {
                shell.openExternal('http://electron.atom.io')
              }
            },
            {
              label: 'Documentation',
              click() {
                shell.openExternal(
                  'https://github.com/atom/electron/tree/master/docs#readme'
                )
              }
            },
            {
              label: 'Community Discussions',
              click() {
                shell.openExternal('https://discuss.atom.io/c/electron')
              }
            },
            {
              label: 'Search Issues',
              click() {
                shell.openExternal('https://github.com/atom/electron/issues')
              }
            }
          ]
        }
      ]
      menu = Menu.buildFromTemplate(template)
      mainWindow.setMenu(menu)
    }
  })
)
