import React, { useMemo, useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import songList from "../../store/songs/songList"
import { observer } from "mobx-react"
import Button from "components/util/Button/Button.style"
import { useTranslation } from "react-i18next"
import MediaBar from "./mediaBar/MediaBar.style"
import ContentWrapper from "components/layout/ContentWrapper/ContentWrapper.style"
import ExtendablePanel from "components/util/ExtendablePanel/ExtendablePanel.style"
import { getDataObjects } from "./SongEditPanels"
import EditField from "./EditField/EditField.style"
import AddTag from "./AddTag/AddTag.style"
import { prompt } from "components/util/Prompt/Prompt"

const SongEdit = ({ className }: { className?: string }) => {
	const [changesMade, setChangesMade] = useState(false)
	const params = useParams<{ index: string }>()
	const history = useHistory()
	const { t } = useTranslation()
	const index = parseInt(params.index)
	const song = songList.songs[index]
	const dataObjects = useMemo(
		() => getDataObjects(song?.details ? song.details.unknownTags : []),
		//eslint-disable-next-line
		[song?.details, song?.details?.unknownTags]
	)
	const onMakeChanges = () => {
		setChangesMade(true)
	}

	const saveAndExit = () => {
		song.saveToFile().then(() => {
			history.push("/list")
		})
	}
	const exitWithoutSave = () => {
		history.push("/list")
	}
	const onExitButton = () => {
		if (changesMade) {
			prompt.displayPrompt({
				title: t("edit.promptTitle"),
				subtitle: t("edit.promptSubtitle"),
				buttons: [
					{
						text: t("edit.saveAndExit"),
						callback: saveAndExit,
					},
					{
						text: t("edit.exitNoSave"),
						callback: exitWithoutSave,
					},
					{
						text: t("cancel"),
					},
				],
			})
		} else {
			exitWithoutSave()
		}
	}

	const details = song?.details
	if (!song || !details) return <ContentWrapper />
	return (
		<ContentWrapper
			className={className}
			contentBottom={
				<Button color="blueLight" onClick={onExitButton}>
					{t("edit.end")}
				</Button>
			}
		>
			<MediaBar song={song} />
			<ExtendablePanel
				content={dataObjects.map((v, i, a) => {
					return {
						header: <h2 className="accordionHeader">{t(v.header)}</h2>,
						content: (
							<div className="fieldWrapper">
								{v.tags
									.map<React.ReactNode>((tag, index, array) => {
										return (
											<EditField
												key={tag.name}
												details={details}
												label={t(`tags.${tag.name}`, {
													defaultValue: tag.name,
												})}
												severity={tag.severity}
												tag={tag.name}
												isFile={tag.isFile}
												optional={tag.optional}
												deletable={i === a.length - 1}
												onChange={onMakeChanges}
											/>
										)
									})
									.concat(
										i === a.length - 1 ? (
											<AddTag
												key="addTag"
												details={details}
												onAdd={onMakeChanges}
											/>
										) : null
									)}
							</div>
						),
					}
				})}
			/>
		</ContentWrapper>
	)
}

export default observer(SongEdit)
