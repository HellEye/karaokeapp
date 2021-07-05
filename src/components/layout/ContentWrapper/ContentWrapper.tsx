import React, { FC, ReactElement, ReactNode } from "react"

interface Props {
	className?: string
	contentBottom?: ReactNode
}

const ContentWrapper: FC<Props> = ({
	className,
	children,
	contentBottom,
}) => {
	return (
		<div className={"contentWrapper " + className}>
			<div className="content">{children}</div>
			<div className="contentBottom">{contentBottom}</div>
		</div>
	)
}

export default ContentWrapper
