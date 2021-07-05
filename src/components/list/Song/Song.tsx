import React, { FC } from "react"
import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"
//import "../../res/css/components/list/songList.css"
import WarnIcon from "../WarnIcon/WarnIcon.style"
import { Edit, MoreVert, CloudDone, CloudOff } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { default as SongObj } from "../../../store/songs/song"
import CSS from "csstype"

type SongProps = {
	song: SongObj
	index: number
	className?: string
	style?: CSS.Properties
}

const Song: FC<SongProps> = (props) => {
	const { t } = useTranslation()
	const details = props.song.details

	return (
		<div
			className={
				"listElem" + (details?.hasErrors() ? " error " : "") + props.className
			}
		>
			<div className="songName">
				<span className="bold">
					{details?.tags.ARTIST || t("list.detailsError")}
				</span>{" "}
				- <span className="italic">{details?.tags.TITLE}</span>
			</div>
			<div className="icons">
				<WarnIcon song={props.song} />

				<div className="cloudIcon">
					{details?.isInDb ? <CloudDone /> : <CloudOff />}
				</div>
				<Link to={`/song/${props.index}`}>
					<div className="edit">
						<Edit />
					</div>
				</Link>
				<div
					className="other"
					onClick={() => {
						props.song.saveToFile()
					}}
				>
					<MoreVert />
				</div>
			</div>
		</div>
	)
}

export default observer(Song)
