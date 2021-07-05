import { useMemo } from "react"
import useMedia, { MediaReturnType } from "../mediaPlayer/useMediaPlayer"

interface AudioReturnType extends MediaReturnType {
	audio: HTMLAudioElement
}

const useAudio = (path: string): AudioReturnType => {
	const audio = useMemo(() => new Audio(`file://${path}`), [path])
	const {
		loaded,
		playing,
		setPlaying,
		togglePlaying,
		currentTime,
		currentTimeFormatted,
		duration,
		durationFormatted,
	} = useMedia(audio)

	return {
		audio,
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

export default useAudio
