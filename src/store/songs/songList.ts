import {
	makeObservable,
	observable,
	action,
	computed,
	runInAction,
	IObservableArray,
	reaction,
} from "mobx"
import Song from "./song"
import pathStore from "../path/path"
import jsonManager from "../../scripts/jsonManager/jsonManager"
import remoteDev from "mobx-remotedev"
const { promisify } = require("util")
const path = window.require("path")
const fs = window.require("fs")

const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
// const exists = promisify(fs.exists)

const dbFileName = "songbase.json"

async function getFiles(dir: string): Promise<any> {
	const subdirs = await readdir(dir)
	const files = await Promise.all(
		subdirs.map(async (subdir: string) => {
			const res = path.resolve(dir, subdir)
			return (await stat(res)).isDirectory() ? getFiles(res) : res
		})
	)
	return files.reduce((a: any, f) => a.concat(f), [])
}

async function loadDbFile(dir: string) {
	try {
		const file = path.join(dir, dbFileName)
		const content = await fs.readFile(file)
		return JSON.parse(content)
	} catch (e) {
		return undefined
	}
}

@remoteDev({
	name: "SongList",
	global: true,
	filters: {
		blacklist: "checkError|loadMetadata",
	},
})
export class SongListStore {
	readonly songs: IObservableArray<Song> = observable([])
	initialized: boolean = false
	initializing: boolean = false
	constructor() {
		reaction(
			() => pathStore.path,
			action((value, previosValue, r) => {
				this.setInitialized(false)
			})
		)

		makeObservable(this, {
			initialized: observable,
			initialize: action,
			loadSongbase: action,
			loadFromJsonManager: action,
			saveToJsonManager: action,
			addSongs: action,
			clearSongs: action,
			setInitialized: action,
			length: computed,
		})
	}

	loadFromJsonManager = () => {
		const dir = pathStore.path
		const newSongs = jsonManager.getData(dir).songList.map((s: any) => {
			return new Song(s.path, false, s.encoding)
		})
		if (newSongs && newSongs.length > 0) {
			this.songs.replace(newSongs)
		}
	}

	saveToJsonManager = () => {
		jsonManager.data.songs = this.songs.map((s) => {
			return {
				path: s.path,
				encoding: s.encoding,
			}
		})
	}

	clearSongs = () => {
		this.songs.clear()
	}

	initialize = action(async () => {
		if (this.initialized || this.initializing) return
		this.initializing = true
		this.clearSongs()
		const dir = pathStore.path
		if (this.checkSongbaseExist(dir)) {
			//1.
			await this.loadSongbase(dir) //2.
		}
		await this.loadNewFiles(dir) //3. & 4. & 5.
		await this.loadMetadata() // 6.
		await this.verifyDetails()

		this.initializing = false
		this.setInitialized(true)
	})

	setInitialized = (value: boolean) => {
		this.initialized = value
	}

	checkSongbaseExist = (dir: string) => {
		return fs.existsSync(path.join(dir, dbFileName))
	}

	loadSongbase = async (dir: string): Promise<void> => {
		this.clearSongs()
		const data = await loadDbFile(dir)

		//check if song .txt exists
		for (let i = 0; i < data.length; i++) {
			const exists = await fs.exists(data[i])
			if (!exists) data.splice(i--, 1)
		}
		//load song objects
		this.addSongs(
			...data.map((song: any) => {
				return new Song(song, false, "")
			})
		)
	}

	loadNewFiles = async (dir: string) => {
		const newFiles = (await getFiles(dir)).filter((file: string) =>
			file.endsWith(".txt")
		)

		for (let songNum = 0; songNum < this.songs.length; songNum++) {
			for (let fileNum = 0; fileNum < newFiles.length; fileNum++) {
				if (this.songs[songNum].path === newFiles[fileNum])
					newFiles.splice(fileNum--, 1)
			}
		}
		this.addSongs(...newFiles.map((f: any) => new Song(f, true, "ISO-8859-1")))
	}

	addSongs = (...songs: Song[]) => {
		this.songs.push(...songs)
	}

	loadMetadata = async () => {
		this.songs.forEach((s) => s.loadMetadata())
	}

	verifyDetails = async () => {
		this.songs.forEach((s) => s.verifyDetails())
	}

	get length() {
		return this.songs.length
	}
}

const songList = new SongListStore()

export default songList
