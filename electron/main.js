const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    //window size
    width: 800,
    height: 600,

    //Hide "File Edit View etc..." toolbar
    autoHideMenuBar: true,
  });

  //load app index.html - use relative path from project folder root
  win.loadFile("./dist/index.html");
};

//open app
app.whenReady().then(() => {
  createWindow();

  //for Mac Os
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Close the app when closing the window
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
