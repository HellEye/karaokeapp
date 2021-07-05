import React, { FC, FormEvent } from "react"
import { observer } from "mobx-react"
import { useStoreMap } from "../../util/hooks/useStore"
import songDetails from "../../../store/songs/songDetails"
import styled from "styled-components"
import { colors } from "../../../Styles/GlobalStyle"
import InputField from "./InputField.style"
import DeleteIcon from "@material-ui/icons/Delete"
import Button from "components/util/Button/Button.style"
type Props = {
	tag: string
	details: songDetails
	label?: string
	className?: string
	isFile?: boolean
	optional?: boolean
	severity: number
	deletable?: boolean
	onChange?: () => void
}

export const InputLabel = styled.h3<{ color: string }>`
	${(props) => colors[props.color]}
	font-size: 1.1em;
	padding: 0 1.5em;
	display: flex;
	align-items: center;
`

const EditField: FC<Props> = observer(
	({
		className,
		tag,
		details,
		label,
		isFile,
		optional,
		severity,
		deletable,
		onChange: onChangeCallback,
	}) => {
		// const [value, setValue] = useState(props.details[props.tag])
		const [value, setValue] = useStoreMap<string>(details, tag)
		const deleteTag = () => {
			details.deleteTag(tag)
		}
		const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value)
			onChangeCallback?.()
		}
		return (
			<div className={className}>
				<InputLabel className={`label`} color="darkGrey">
					{label}
				</InputLabel>
				<InputField value={value} onChange={onChange} isFile={isFile} />
				{deletable ? (
					<Button
						className="deleteButton"
						color="errorDark"
						onClick={deleteTag}
					>
						<DeleteIcon />
					</Button>
				) : null}
			</div>
		)
	}
)

export default EditField
