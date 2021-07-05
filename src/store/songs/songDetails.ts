import { makeObservable, observable, action, computed } from "mobx"
import { StoreMap } from "../Store"
const fs = window.require("fs")
const path = window.require("path")

/* 
Errors:
-No track error: the #MP3 tag is missing, blank or the specified file is missing [MusicOff]
-No BPM error: the #BPM tag is missing or blank [TimerOff]
-No essential metadata: the #TITLE and #ARTIST tags are missing or blank [SpeakerNotesOff]

Other errors (Separate codes but [Warning] icon):
-WorldParty duet detected: The song contains #DUETSINGERP1 and/or #DUETSINGERP2

Warnings:
-No background found: there is no #BACKGROUND tag or the file is missing [Panorama]
-No cover file found: there is no #COVER tag or the file is missing [Album]
-Incomplete metadata: #LANGUAGE, #YEAR and/or #GENRE tags are missing or blank [Message]
*/
export type Error = {
	code: number
	cantContain: boolean
	checkPath: boolean
	tags: string[]
	name: string
	color: string
	icon: string
}
export const errors: any = {
	missingTrack: {
		code: 11,
		cantContain: false,
		checkPath: true,
		tags: ["MP3"],
		name: "errors.missingTrack.name",
		color: "red",
		icon: "musicOff",
	},
	missingBPM: {
		code: 12,
		cantContain: false,
		checkPath: false,
		tags: ["BPM"],
		name: "errors.missingBPM.name",
		color: "red",
		icon: "timerOff",
	},
	missingTileArtist: {
		code: 13,
		cantContain: false,
		checkPath: false,
		tags: ["TITLE", "ARTIST"],
		name: "errors.missingTitleArtist.name",
		color: "red",
		icon: "speakerNotesOff",
	},
	duet: {
		code: 14,
		cantContain: true,
		checkPath: false,
		tags: ["DUETSINGERP1", "DUETSINGERP2"],
		name: "errors.duet.name",
		color: "red",
		icon: "warning",
	},
	noBackgroundFile: {
		code: 21,
		cantContain: false,
		checkPath: true,
		tags: ["BACKGROUND"],
		name: "errors.noBackgroundFile.name",
		color: "yellow",
		icon: "panorama",
	},
	noCoverFile: {
		code: 22,
		cantContain: false,
		checkPath: true,
		tags: ["COVER"],
		name: "errors.noCover.name",
		color: "yellow",
		icon: "album",
	},
	incompleteMetadata: {
		code: 23,
		cantContain: false,
		checkPath: true,
		tags: ["LANGUAGE", "YEAR", "GENRE"],
		name: "errors.incompleteMetadata.name",
		color: "yellow",
		icon: "message",
	},
}

//error objects addressed by code # instead of the name
export const errorsByCode: Error[] = []

for (let key in errors) {
	errorsByCode[errors[key].code] = errors[key]
}
const knownTags: string[] = errorsByCode.flatMap<string>((v) => {
	return v.code !== 14 ? v.tags : []
})
knownTags.push("VIDEO", "EDITION", "GAP", "VIDEOGAP")

type Tag = string
export type Tags = { [key: string]: Tag }
export type ErrorCode = {
	code: number
	tags: string[]
}
export interface iSongDetails {
	directoryPath: string
	errors: ErrorCode[]
	tags: Tags
	isInDb: boolean
	toFileFormat: () => string
	verify: () => void
	hasErrors: () => boolean
	hasWarnings: () => boolean
}
export default class songDetails implements iSongDetails, StoreMap<string> {
	errors: ErrorCode[] = []
	directoryPath = ""
	tags: Tags = {}
	isInDb = Math.random() > 0.5
	//TODO set data type
	constructor(data: Tags, directoryPath: string) {
		this.directoryPath = directoryPath
		const makeObservableObject: any = {
			errors: observable,
			tags: observable,
			isInDb: observable,
			checkError: action,
			setByTag: action,
			addTag: action,
			deleteTag: action,
			setIsInDb: action,
			setValue: action,
			unknownTags: computed,
		}

		for (let key in data) {
			this.setByTag(key, data[key])
			// this[key]=data[key]
		}

		makeObservable(this, makeObservableObject)
	}
	getValue = (key: string) => {
		return this.tags[key]
	}

	makeErrorObject = (tags: Tag[], code: number): ErrorCode => {
		return {
			code: code,
			tags: tags,
		}
	}
	checkError = (error: Error) => {
		const invalidTags = []

		for (let tag of error.tags) {
			const checks = {
				contains: false,
				pathValid: false,
			}
			if (this.tags[tag]) checks.contains = true
			if (error.checkPath) {
				if (this.tags[tag]) {
					checks.pathValid = fs.existsSync(
						path.join(this.directoryPath, this.tags[tag])
					)
				} else {
					checks.pathValid = false
				}
			}
			if (
				(error.cantContain && checks.contains) ||
				(!error.cantContain && !checks.contains) ||
				(error.checkPath && !checks.pathValid)
			) {
				invalidTags.push(tag)
			}
		}
		if (invalidTags.length > 0)
			this.errors.push(this.makeErrorObject(invalidTags, error.code))
	}

	get unknownTags(): Tag[] {
		const out = Object.keys(this.tags).filter((t) => !knownTags.includes(t))
		console.log(out)
		return out
	}

	getTagsAsList = (): Tag[] => {
		const out: Tag[] = []
		for (const tag in this.tags) {
			out.push(tag)
		}
		return out
	}

	setByTag = (tag: string, value: string) => {
		this.tags[tag] = value
	}
	setValue = this.setByTag

	addTag = (tag: string) => {
		if (!tag || !tag.replace(" ", "")) return
		this.tags[tag.replace(" ", "").toUpperCase()] = tag.replace(" ", "")
	}

	deleteTag = (tag: string): void => {
		delete this.tags[tag]
	}

	verify = () => {
		errorsByCode.forEach((e) => {
			this.checkError(e)
		})
	}
	hasErrors: () => boolean = () => {
		return (
			this.errors.length > 0 && this.errors.findIndex((e) => e.code < 20) >= 0
		)
	}
	hasWarnings = () => {
		return this.errors.length > 0
	}

	setIsInDb = (isInDb: boolean) => {
		this.isInDb = isInDb
	}

	toFileFormat = () => {
		const out = []
		for (let tag in this.tags) {
			if (tag && this.tags[tag]) out.push(`#${tag}:${this.tags[tag]}`)
		}
		return out.join("\n")
	}
}
