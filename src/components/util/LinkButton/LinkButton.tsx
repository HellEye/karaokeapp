import React, { FC } from "react"
import { Link } from "react-router-dom"

export interface LinkButtonProps {
  to: string,
	className?: string
  children?:any
}

const LinkButton: FC<LinkButtonProps> = ({ className, to, children }) => {
	return (
		<div className={className+" linkButton"}>
		<Link to={to}>
			{children}
		</Link>
		</div>
	)
}

export default LinkButton
