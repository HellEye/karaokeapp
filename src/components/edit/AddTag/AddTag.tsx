import Button from "components/util/Button/Button.style"
import Input from "components/util/Input/Input.style"
import React, { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import songDetails from "store/songs/songDetails"
import SaveIcon from "@material-ui/icons/Save"
import ClearIcon from "@material-ui/icons/Clear"
import { InputLabel } from "../EditField/EditField"

interface Props {
	className?: string
	details: songDetails
	onAdd?: () => void
}

const AddTag: FC<Props> = ({ className, details, onAdd }) => {
	const [tagName, setTagName] = useState("")
	const [adding, setAdding] = useState(false)
	const { t } = useTranslation()

	const setTag = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTagName(e.target.value)
	}
	const confirmAdd = () => {
		setAdding(false)
		details.addTag(tagName)
	}

	const onKeypress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault()
			confirmAdd()
		}
	}

	const changeAdding = (value: boolean) => () => {
		setAdding(value)
	}
	if (!adding)
		return (
			<div className={className}>
				<Button
					className="newTag"
					color="blueLight"
					onClick={changeAdding(true)}
				>
					{t("edit.addTag")}
				</Button>
			</div>
		)
	return (
		<div className={className}>
			<InputLabel className="label" color="greyLight">
				{t("edit.newTagName")}
			</InputLabel>
			<Input
				className="text"
				color="greyLight"
				onChange={setTag}
				value={tagName}
				placeholder={t("edit.newTagField")}
				onKeyPress={onKeypress}
			/>

			<Button className="icon" color="blueLight" onClick={confirmAdd}>
				<SaveIcon className="confirm" />
			</Button>
			<Button className="icon" color="greyLight" onClick={changeAdding(false)}>
				<ClearIcon className="cancel" />
			</Button>
		</div>
	)
}

export default AddTag
