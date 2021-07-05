// import React from "react"
import { useTranslation } from "react-i18next"
//import "../../res/css/components/menu/Menu.css"
import LinkButton from "../../util/LinkButton/LinkButton.style"
import PathSelect from "../../pathSelect/PathSelect"
import ContentWrapper from "../ContentWrapper/ContentWrapper.style"
export default function Menu({
	className,
}: {
	className?: string
}) {
	const { t } = useTranslation()

	return (
		<ContentWrapper className={className}>
			<PathSelect />
			<LinkButton color="greyLight" to="/list">
				{t("menu.list")}
			</LinkButton>
		</ContentWrapper>
	)
}
