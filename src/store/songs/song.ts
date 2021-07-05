import { makeObservable, observable, action, computed } from "mobx"
import songDetails, { Tags } from "./songDetails"
import i18n from "i18next"
import mobxRemotedev from "mobx-remotedev"
const encodingConverter = require("encoding")
const fs = window.require("fs")
const pathLib = window.require("path")
const charsToReplace = [
	"\r",
	"#",
	"﻿", //Zero width space????
]
type Encoding = string
export const charsets: Encoding[] = ["windows-1250", "ISO-8859-1", "UTF-8"]

class Song {
	writingToFile = false
	path: string
	notInJson: boolean
	encoding: string
	details: songDetails | null
	constructor(path: string, notInJson: boolean, encoding: Encoding) {
		this.path = path
		this.notInJson = notInJson
		this.encoding = encoding
		this.details = null
		makeObservable(this, {
			path: observable,
			encoding: observable,
			writingToFile: observable,
			fileName: computed,
			displayName: computed,
			loadMetadata: action,
			setEncoding: action,
			saveToFile: action,
		})
	}

	setEncoding(encoding: Encoding) {
		this.encoding = encoding
		this.loadMetadata()
	}

	//Call with file encoding to reload using that encoding.
	// List of encodings is in <charsets>
	loadMetadata = () => {
		this.details = new songDetails(
			this.splitText(this.loadFromFile())[0],
			pathLib.dirname(this.path)
		)
	}

	loadFromFile = () => {
		let out: Buffer = fs.readFileSync(this.path)

		// if (this.encoding)
		// out = encodingConverter.convert(out, "utf-8", this.encoding)

		return out.toString()
	}
	splitText = (out: string): [any, string] => {
		const [metadata, ...content] = out.split(RegExp("\\n(?!#)"))
		const details: Tags = {}
		metadata.split("\n").forEach((line) => {
			charsToReplace.forEach((char) => {
				line = line.replace(char, "")
			})
			const [tag, data] = line.split(":")
			details[tag] = data
		})
		return [details, content.join("\n")]
	}

	verifyDetails = () => {
		if (this.details) this.details.verify()
	}
	get displayName() {
		if (this.details)
			return `${this.details.tags.AUTHOR} - ${this.details.tags.TITLE}`
		return i18n.t("list.detailsError")
	}
	get fileName() {
		return pathLib.basename(this.path)
	}
	saveToFile = async () => {
		if (this.writingToFile || !this.details) return
		const content = this.splitText(this.loadFromFile())[1]
		const header = this.details.toFileFormat()
		const fullText = `${header}\n${content}`
		const fullData = encodingConverter.convert(fullText, this.encoding, "utf-8")
		this.writingToFile = true
		fs.writeFile(this.path, fullData, (e: any) => {
			if (e) console.error("Error writing to file", e)
			this.writingToFile = false
			console.log(`Saved ${this.path}`)
		})
	}
}

export default Song
