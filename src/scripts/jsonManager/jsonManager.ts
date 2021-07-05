import { makeObservable, observable, action } from "mobx"
// const {makeObservable, observable, action} = require("mobx")

const fs = window.require("fs")
const pathLib = window.require("path")
const SONGBASE_FILE_NAME = "songBase.json"
interface IJsonManager {
	data: any
	isLoaded: boolean
	path:string
}
class JsonManager implements IJsonManager{
	data:any
	isLoaded
	path
	constructor() {
		this.data = {}
    this.isLoaded = false
    this.path = ""
		makeObservable(this, {
			data: observable,
      isLoaded: observable,
      load: action,
      getData:action
		})
	}

  load = async (path:string) => {
    this.path=path
		this.isLoaded = false
		if (path.endsWith("/")) path+=SONGBASE_FILE_NAME
		else {
			path = pathLib.join(path, SONGBASE_FILE_NAME)
		}
		if (!fs.exists(path)) {
			return false
		}
		const fileContent = (await fs.readFile(path))?.toString()
		if (!fileContent) {
			this.data = {}
			return false
		}
		try {
			this.data = JSON.parse(fileContent)
		} catch (e) {
			console.log("Failed to parse JSON of file " + path)
			return false
		}
		this.isLoaded = true
		return true
	}

  getData = (path:string) => {
    if (!this.isLoaded || this.path !== path) {
      this.path=path
      return this.load(path).then((data) => {
        return data
      })}
		return this.data
  }
  
  save = async () => {
    if (!this.isLoaded) return
    await fs.writeFile(JSON.stringify(this.data), this.path)
  }
}

const jsonManager = new JsonManager()

export default jsonManager
