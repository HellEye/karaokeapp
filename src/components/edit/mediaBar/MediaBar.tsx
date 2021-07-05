import ImagePlaceholder from "components/util/imagePlaceholder/ImagePlaceholder"
import React, { FC, ReactElement } from "react"
import { useTranslation } from "react-i18next"
import Song from "store/songs/song"
import Mp3Player from "../mp3Player/Mp3Player.style"
import placeholder from "res/img/placeholder.jpg"
import VideoPlayer from "../videoPlayer/VideoPlayer.style"
const path = window.require("path")
interface Props {
	className?: string
	song: Song
}

const MediaBar: FC<Props> = ({ className, song }) => {
	const { t } = useTranslation()
	const details = song?.details
	const getPath = (file: string | undefined) => {
		if (!file) return ""
		return `file://${path.join(
			details?.directoryPath,
			file
		)}`
	}

	return (
		<div className={className}>
			<h3> {t("edit.mediaPreview")} </h3>
			<Mp3Player song={song} />
			<div className="coverImage">
				<ImagePlaceholder
					placeholder={placeholder}
					src={getPath(details?.tags.COVER)}
					alt="cover"
				/>
			</div>
			<div className="backgroundImage">
				<ImagePlaceholder
					placeholder={placeholder}
					src={getPath(details?.tags.BACKGROUND)}
					alt="cover"
				/>
			</div>
			<div className="video">
				<VideoPlayer song={song} />
			</div>
		</div>
	)
}

export default MediaBar
