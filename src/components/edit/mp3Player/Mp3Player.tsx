import React, { FC } from "react"
import Song from "store/songs/song"
import { PlayArrowRounded, StopRounded } from "@material-ui/icons"
import useAudio from "./useAudio"
import { observer } from "mobx-react"
// import Sound from "react-sound"
// import fileUrl from "file-url"

// import {createSongUri} from "electron-audio-conversion"
const path = window.require("path")

interface Props {
	song: Song
	className?: string
}

const Mp3Player: FC<Props> = ({ song, className }) => {
	const soundUrl = path.join(
		song.details?.directoryPath,
		song.details?.tags.MP3
	)

	const {
		loaded,
		playing,
		togglePlaying,
		currentTimeFormatted,
		durationFormatted,
	} = useAudio(soundUrl)

	if (!loaded) return <div>Loading</div>

	return (
		<div className={className}>
			<div className="playIcon" onClick={togglePlaying}>
				{playing ? <StopRounded /> : <PlayArrowRounded />}
			</div>

			<div className="duration">
				<span> {currentTimeFormatted} </span>/<span>{durationFormatted}</span>
			</div>
		</div>
	)
}

export default observer(Mp3Player)
