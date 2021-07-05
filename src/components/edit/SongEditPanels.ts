interface Tag {
	name: string
	isFile?: boolean
	severity: number
	optional?: boolean
}

interface IDataObj {
	tags: Tag[]
	header: string
}
const getDataObjects = (otherTags: string[]): IDataObj[] => {
	return [
		{
			header: "edit.basicTags",
			tags: [
				{
					name: "TITLE",
					severity: 2,
				},
				{
					name: "ARTIST",
					severity: 2,
				},
				{
					name: "MP3",
					severity: 2,
					isFile: true,
				},
				{
					name: "BPM",
					severity: 2,
				},
			],
		},
		{
			header: "edit.syncTags",
			tags: [
				{
					name: "GAP",
					severity: 0,
					optional: true,
				},
				{
					name: "VIDEOGAP",
					severity: 0,
					optional: true,
				},
			],
		},
		{
			header: "edit.presentationTags",
			tags: [
				{
					name: "COVER",
					severity: 1,
					isFile: true,
				},
				{
					name: "BACKGROUND",
					severity: 1,
					isFile: true,
				},
				{
					name: "VIDEO",
					severity: 0,
					isFile: true,
					optional: true,
				},
			],
		},
		{
			header: "edit.searchTags",
			tags: [
				{
					name: "LANGUAGE",
					severity: 0,
					optional: true,
				},
				{
					name: "GENRE",
					severity: 0,
					optional: true,
				},
				{
					name: "YEAR",
					severity: 0,
					optional: true,
				},
				{
					name: "ALBUM",
					severity: 0,
					optional: true,
				},
				{
					name: "CREATOR",
					severity: 0,
					optional: true,
				},
				{
					name: "EDITION",
					severity: 0,
					optional: true,
				},
			],
		},

		{
			header: "edit.otherTags",
			tags: otherTags.map((tag) => {
				return {
					name: tag,
					severity: 0,
					optional: true,
				}
			}),
		},
	]
}

export { getDataObjects }
