import React, { FC, useRef } from "react"
// import ReactDOM from "react-dom"
import Song from "store/songs/song"
import useVideo from "./useVideo"
const path = window.require("path")
interface Props {
	className?: string
	song: Song
}

const VideoPlayer: FC<Props> = ({
	className,
	song,
}: Props) => {
	const ref = useRef<HTMLDivElement>(null)
	const videoUrl = song?.details?.tags.Video
		? path.join(
				song.details?.directoryPath,
				song.details?.tags.VIDEO
		  )
		: ""
	const { video } = useVideo(videoUrl)

	return (
		<div className={className} ref={ref}>
			<video src={`file://${videoUrl}`} controls></video>
		</div>
	)
}

export default VideoPlayer
