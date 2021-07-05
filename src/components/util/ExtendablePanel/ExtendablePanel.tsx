import React, { FC } from "react"
const {
	Tabbordion,
	TabPanel,
	TabLabel,
	TabContent,
} = require("react-tabbordion")
interface Props {
	className?: string
	content: { header: React.ReactNode; content: React.ReactNode }[]
}

const ExtendablePanel: FC<Props> = ({ className, content }) => {
	return (
		<Tabbordion
			className={className}
			animateContent="height"
			component="div"
			mode="single"
			initialIndex={0}
		>
			{content.map((v, i) => {
				return (
					<TabPanel key={`tabPanel${i}`} className={`tabPanel`} component="div">
						<TabLabel className={`tabHeader`}>{v.header}</TabLabel>
						<TabContent className={"tabContent"}>{v.content}</TabContent>
					</TabPanel>
				)
			})}
		</Tabbordion>
	)
}

export default ExtendablePanel
