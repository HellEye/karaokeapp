import React, { useState, FC, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import { default as SongObj } from "../../../store/songs/song"
import songList from "../../../store/songs/songList"
import Song from "../Song/Song.style"
import { default as SongType } from "store/songs/song"
import { Search } from "../../util/Search/Search.style"
import { FilterList, CloudUpload, CloudDownload } from "@material-ui/icons"
import ContentWrapper from "components/layout/ContentWrapper/ContentWrapper.style"
import { FixedSizeList } from "react-window"
import useFilter from "./SongListFilter/useFilter"
import path from "store/path/path"
type RenderFunctionParams = {
	data: SongObj[]
	index: number
	style: any
}

const renderSong: FC<RenderFunctionParams> = ({ data, index, style }) => {
	return (
		<div className="songWrapper" style={style}>
			<Song song={data[index]} index={index} />
		</div>
	)
}

type SongListParams = {
	className?: string
}
const SongList: FC<SongListParams> = ({ className }) => {
	const { t } = useTranslation()
	const [search, setSearch] = useState("")

	if (!songList.initialized && !songList.initializing) songList.initialize()

	const filteredSongList = useFilter<SongType>({
		elements: songList.initialized ? songList.songs : [],
		stringFilters: [
			(song) => song.displayName.toLowerCase().includes(search.toLowerCase()),
		],
		valuesUsed: [search],
	})

	if (!songList.initialized) {
		return <ContentWrapper className={className}>Loading.....</ContentWrapper>
	}

	return (
		<ContentWrapper
			className={className}
			contentBottom={
				<>
					<div className="button">
						<CloudUpload className="icon" /> {t("list.cloudUpload")}
					</div>
					<div className="button">
						<CloudDownload className="icon" /> {t("list.cloudDownload")}
					</div>
				</>
			}
		>
			<div className="header">
				<div>
					<span>{t("list.songsDetected")}</span>:&nbsp;
					<span className="bold">{songList.length}</span>
				</div>
				<div className="filter">
					<FilterList />
				</div>
				<Search onChange={setSearch} placeholder={t("search")} />
			</div>
			<div className="list">
				<FixedSizeList
					itemData={filteredSongList}
					itemKey={(index: number, songList: SongObj[]) =>
						songList[index].displayName
					}
					itemCount={filteredSongList.length}
					height={800}
					itemSize={55}
					width={"100%"}
				>
					{renderSong}
				</FixedSizeList>
			</div>
		</ContentWrapper>
	)
}

export default observer(SongList)
