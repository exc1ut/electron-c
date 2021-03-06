/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import net from 'net';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

let lastQuery: any = {};
let string = '';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'resources')
    : path.join(__dirname, '../resources');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  console.log(getAssetPath('icon.png'));

  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 1024,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

const port = 8080;

const client = net.createConnection({ port, host: '192.168.1.15' }, () => {
  // 'connect' listener.
  console.log('connected to server!');
});

function sendMessage(string: string) {
  let str = '';
  str += string;
  str += '\n';
  while (str.length <= 10024) {
    str += '\0';
  }
  client.write(str);
}

function formatText(string: string) {
  const last = string.charAt(string.length - 1);
  const regex = new RegExp(last, 'g');
  return string.replace(regex, '');
}

client.on('data', (data) => {
  const text = data.toString();
  string += text;
  console.log(lastQuery.type)
  switch (lastQuery.type) {
    case 'sign_up':
    case 'add_job':
      mainWindow?.webContents.send('snack', string);
      string = "";
      break;
    case 'sign_in':
      mainWindow?.webContents.send('sign_in', string);
      string = "";
      break;

    default:
      console.log(string);
  }
  if (string[0] === '[' && string[string.length - 1] === ']') {
    switch (lastQuery.type) {
      case 'sign_up':
      case 'add_job':
        mainWindow?.webContents.send('snack', string);
        break;
      case 'sign_in':
        mainWindow?.webContents.send('sign_in', string);
        break;
      case 'get_jobs':
        mainWindow?.webContents.send('get_jobs', string);
        break;
      case 'get_vacants':
        mainWindow?.webContents.send('get_vacants', string);
        break;
      case 'get_item_by_id':
        mainWindow?.webContents.send('get_item_by_id', string);
        break;
      case 'search_text':
        mainWindow?.webContents.send('search_text', string);
        break;

      default:
        console.log(string);
    }
    string = '';
  }
});

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg); // prints "ping"
  event.reply('asynchronous-reply', 'pong');
});

ipcMain.on('send_to_server', (event, arg) => {
  console.log(JSON.stringify(arg)); // prints "ping"
  lastQuery = arg;
  const toJson = JSON.stringify(arg);
  sendMessage(toJson);
  event.returnValue = 'asd';
});
