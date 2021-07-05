import remoteDev from "mobx-remotedev/lib/dev"
import songList from "./songs/songList"
import path from "./path/path"
import { makeObservable, observable } from "mobx"

class MainStore {
	constructor() {
		this.songList = songList
		this.path = path
		makeObservable(this, {
			songList: observable,
			path: observable
		})
	}
}

const instance = new MainStore()
export default instance
