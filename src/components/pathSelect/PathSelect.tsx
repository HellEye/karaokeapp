import React from "react"
import { observer } from "mobx-react"
import { useTranslation } from "react-i18next"
import Button from "../util/Button/Button.style"
import path from "../../store/path/path"

export default observer(function PathSelect() {
	const { t } = useTranslation()

	const showPathSelectDialog = () => {
		path.showDialog()
	}

	return (
		<>
			<Button color="greyLight" onClick={showPathSelectDialog}>
				{t("menu.browse")}
			</Button>
			{path.path ? (
				<h3 style={{ width: "min(60em,60vw)" }}>{path.path}</h3>
			) : (
				<h3>{t("menu.noPathSelected")}</h3>
			)}
		</>
	)
})
