import React, { FC, useState, useRef, MutableRefObject, useEffect } from "react"
import { Search as SearchIcon } from "@material-ui/icons"
type SearchProps = {
	placeholder: string
	className?: string
	onChange: (value: string) => void
	timeoutLength?: number
}
const Search: FC<SearchProps> = ({
	placeholder,
	className,
	onChange,
	timeoutLength,
}) => {
	const [currentValue, setCurrentValue] = useState<string>("")
	const callbackTimeout: MutableRefObject<NodeJS.Timeout | undefined> =
		useRef<NodeJS.Timeout>()

	useEffect(() => {
		if (callbackTimeout.current) {
			window.clearTimeout(callbackTimeout.current)
		}
		callbackTimeout.current = setTimeout(() => {
			onChange(currentValue)
		}, timeoutLength)

		return () => {
			if (callbackTimeout.current) {
				window.clearTimeout(callbackTimeout.current)
			}
		}
	}, [currentValue, onChange, timeoutLength])

	const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentValue(e.target.value)
	}

	return (
		<div className={className}>
			<SearchIcon className="searchIcon" />
			<input
				type="text"
				className="text"
				value={currentValue}
				placeholder={placeholder}
				onChange={onValueChange}
			/>
		</div>
	)
}
Search.defaultProps = {
	timeoutLength: 500,
}

export default Search
