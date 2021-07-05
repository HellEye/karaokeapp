const { app, BrowserWindow } = require("electron")
const path = require("path")
require("@electron/remote/main").initialize()
const {
	default: installExtension,
	REACT_DEVELOPER_TOOLS,
	REDUX_DEVTOOLS,
	MOBX_DEVTOOLS,
} = require("electron-devtools-installer")
// const jsonManager = require("../src/scripts/jsonManager/jsonManager")

function createWindow() {
	const window = new BrowserWindow({
		width: 1280,
		height: 960,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false,
			webSecurity: false,
			preload: path.join(__dirname, "/preload.js"),
		},
	})

	window.loadURL("http://localhost:5678/")
}

app.on("ready", createWindow)
app.whenReady().then(() => {
	installExtension(REACT_DEVELOPER_TOOLS)
		.then((name) => console.log(`Added Extension:  ${name}`))

		.then(() => {
			installExtension(REDUX_DEVTOOLS)
		})
		.then((name) => console.log(`Added Extension:  ${name}`))
		.then(() => {
			installExtension(MOBX_DEVTOOLS)
		})
		.then((name) => console.log(`Added Extension:  ${name}`))
		.catch((err) => console.log("An error occurred: ", err))
})
//apparently some mac stuff
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit()
})

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on("quit", (e) => {
	// e.preventDefault()
	// jsonManager.save().then(() => {
	// app.quit()
	// })
})
