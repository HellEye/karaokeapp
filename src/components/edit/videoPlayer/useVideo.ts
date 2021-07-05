import { useMemo } from "react"
import useMedia, { MediaReturnType } from "../mediaPlayer/useMediaPlayer"

interface VideoReturnType extends MediaReturnType {
	video: HTMLVideoElement
}
const useVideo = (path: string): VideoReturnType => {
	const video = useMemo(() => {
		const v = document.createElement("video")
		v.src = `file://${path}`
		return v
	}, [path])

	const {
		loaded,
		playing,
		setPlaying,
		togglePlaying,
		currentTime,
		currentTimeFormatted,
		duration,
		durationFormatted,
	} = useMedia(video)
	return {
		video,
		loaded,
		playing,
		setPlaying,
		togglePlaying,
		currentTime,
		currentTimeFormatted,
		duration,
		durationFormatted,
	}
}
export default useVideo
