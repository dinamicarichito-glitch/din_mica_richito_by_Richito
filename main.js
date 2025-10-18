const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;
let licenseWindow;
const licenseFile = path.join(app.getPath("userData"), "license.json");

function createLicenseWindow() {
  licenseWindow = new BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    modal: true,
    closable: false, // evita cierre manual
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  licenseWindow.loadFile("license.html");

  // Evitar que el usuario cierre sin licencia válida
  licenseWindow.on("close", (e) => {
    if (!fs.existsSync(licenseFile)) {
      e.preventDefault();
    }
  });
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadFile("index.html");
}

// Guardar licencia si es válida
ipcMain.on("license-valid", (event, data) => {
  fs.writeFileSync(licenseFile, JSON.stringify(data, null, 2));
  if (licenseWindow) {
    licenseWindow.destroy();
    licenseWindow = null;
  }
  createMainWindow();
});

app.whenReady().then(() => {
  if (!fs.existsSync(licenseFile)) {
    createLicenseWindow();
  } else {
    createMainWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});





