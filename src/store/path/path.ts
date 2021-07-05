import { observable, makeObservable, action, computed } from "mobx"
import { getCookie, setCookie } from "../../scripts/cookie/cookies"
import { Store } from "../Store"
import remoteDev from "mobx-remotedev"

const cookieName = "path"
const remote = window.require("@electron/remote")
const dialog = remote.dialog

interface IPath {
	_path: string
}

@remoteDev({
	name: "Path",
	filters: {
		blacklist: "checkError|loadMetadata",
	},
})
class Path implements IPath, Store<string> {
	_path = getCookie(cookieName)
	constructor() {
		makeObservable(this, {
			_path: observable,
			path: computed,
		})
	}

	get path() {
		setCookie(cookieName, this._path, 365)
		return this._path
	}
	set path(path: string) {
		this._path = path
		setCookie(cookieName, path, 365)
	}
	setValue = (value: string) => (this.path = value)
	getValue = () => this.path

	showDialog = () => {
		dialog
			.showOpenDialog({
				title: "Select directory to scan",
				properties: ["openDirectory"],
			})
			.then(
				action((out: any) => {
					if (!out.cancelled) {
						this.path = out.filePaths[0]
					}
				}, "dialogConfirmed")
			)
	}
}

const instance = new Path()
export default instance
