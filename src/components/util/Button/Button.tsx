//import "../../res/css/components/util/button.css"
import React, { MouseEventHandler } from "react"

export type ButtonProps = {
	className?: string,
	onClick: MouseEventHandler
	children:any
}
function Button(props:ButtonProps) {
	return (
		<button
			className={`button ${props.className ? props.className : ""}`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	)
}

export default Button
