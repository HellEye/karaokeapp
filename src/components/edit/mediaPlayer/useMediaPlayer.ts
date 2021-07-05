import { useState, useEffect } from "react"

export interface MediaReturnType {
	loaded: boolean
	playing: boolean
	togglePlaying: () => void
	setPlaying: (playing: boolean) => void
	currentTime: number
	currentTimeFormatted: string
	duration: number
	durationFormatted: string
}

const useMedia = (media: HTMLMediaElement): MediaReturnType => {
	const [loaded, setLoaded] = useState(false)
	const [playing, setPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)

	media.addEventListener("loadeddata", () => {
		media.volume = 0.2
		setLoaded(true)
	})

	useEffect(() => {
		const interval: NodeJS.Timeout = setInterval(() => {
			setCurrentTime(Math.floor(media.currentTime))
		}, 1000)
		return () => {
			window.clearInterval(interval)
		}
	})
	const togglePlaying = () => {
		setPlaying(!playing)
	}
	useEffect(() => {
		if (playing) media.play()
		else media.pause()
		return () => {
			media.pause()
		}
	}, [playing, media])

	const currentTimeFormatted = new Date(currentTime * 1000)
		.toISOString()
		.substr(14, 5)
	const durationFormatted = media.duration
		? new Date(Math.floor(media.duration) * 1000).toISOString().substr(14, 5)
		: "00:00"
	return {
		loaded,
		playing,
		setPlaying,
		togglePlaying,
		currentTime,
		currentTimeFormatted,
		duration: Math.floor(media.duration),
		durationFormatted,
	}
}

export default useMedia
