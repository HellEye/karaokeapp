import React, { FC, useState } from "react"
import { default as SongObj } from "../../../store/songs/song"
import { useTranslation } from "react-i18next"
import {
	iSongDetails,
	errorsByCode,
	ErrorCode,
} from "../../../store/songs/songDetails"

import {
	Message,
	Album,
	Panorama,
	SpeakerNotesOff,
	TimerOff,
	Warning,
	MusicOff,
} from "@material-ui/icons"

const icons: any = {
	message: Message,
	album: Album,
	panorama: Panorama,
	speakerNotesOff: SpeakerNotesOff,
	timerOff: TimerOff,
	warning: Warning,
	musicOff: MusicOff,
}

type WarningIconDetailsProps = {
	song: iSongDetails
	className?: string
}
const WarningIconDetails: FC<WarningIconDetailsProps> = ({
	song,
	className,
}) => {
	const [hovered, setHovered] = useState(false)
	const [yPos, setYPos] = useState(0)
	const { t } = useTranslation()
	const renderBottom = yPos < window.innerHeight / 2

	let Tooltip = null

	if (song.errors.length === 1) {
		Tooltip = (
			<>
				<h3>
					{t(errorsByCode[song.errors[0].code].name, {
						count: song.errors[0].tags.length,
					})}
				</h3>
				<ul>
					{song.errors[0].tags.map((t, i) => (
						<li key={i}>{t}</li>
					))}
				</ul>
			</>
		)
	} else {
		Tooltip = (
			<>
				<h3>{t("errors.multipleErrors")}</h3>
				<ul>
					{song.errors.map((e: ErrorCode, i: number) => {
						const Icon: any =
							icons[errorsByCode[e.code].icon]
						return (
							<li key={i}>
								<div className="errorList">
									{<Icon />}
									<ul className="tags">
										{e.tags.map((t, j) => (
											<li key={j}>{t}</li>
										))}
									</ul>
								</div>
							</li>
						)
					})}
				</ul>
			</>
		)
	}

	const ErrorIcon =
		song.errors.length > 1
			? icons.warning
			: icons[errorsByCode[song.errors[0].code].icon]

	return (
		<div
			className={"warning " + className}
			onMouseEnter={(e: any) => {
				setHovered(true)
				setYPos(e.target.getBoundingClientRect().y)
			}}
			onMouseLeave={(e) => {
				setHovered(false)
			}}
		>
			<ErrorIcon
				style={{
					color: errorsByCode[song.errors[0].code].color,
				}}
			/>
			{hovered ? (
				<div
					className="floatingBox"
					style={
						renderBottom
							? { top: "50%" }
							: { bottom: "50%" }
					}
				>
					{Tooltip}
				</div>
			) : (
				""
			)}
		</div>
	)
}

export default function WarnIcon({
	song,
	className,
}: {
	song: SongObj
	className?: string
}) {
	if (!song.details || !(song.details.errors.length > 0))
		return null
	return (
		<WarningIconDetails
			className={className}
			song={song.details}
		/>
	)
}
