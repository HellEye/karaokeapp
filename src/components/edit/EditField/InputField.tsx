import React from "react"
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile"
import Input from "components/util/Input/Input.style"

interface Props {
	className?: string
	value: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
	isFile?: boolean
}
//TODO add video translation

const InputField: React.FC<Props> = ({
	className,
	value,
	onChange,
	isFile,
}) => {
	return (
		<div className={className}>
			<Input
				type="text"
				className="text"
				value={value}
				onChange={onChange}
				color="greyLight"
			/>
			{isFile ? <InsertDriveFileIcon className="fileIcon" /> : null}
		</div>
	)
}

export default InputField
