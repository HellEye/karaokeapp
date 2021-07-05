import React, { FC } from "react"
import Logo from "../Logo/Logo"
//import "../../res/css/components/util/navbar.css"
import { useTranslation } from "react-i18next"
import { setCookie } from "../../../scripts/cookie/cookies"
import { useLocation, Link, Switch, Route } from "react-router-dom"
import Button from "components/util/Button/Button.style"
import { prompt } from "components/util/Prompt/Prompt"
const Navbar: FC<{ className?: string }> = ({ className }) => {
	const { t, i18n } = useTranslation()
	const location = useLocation()
	const displayPrompt = () => {
		prompt.displayPrompt({
			title: "TEST",
			subtitle: "Hello world",
			buttons: [
				{
					text: "value: 0",
					callback: () => {
						console.log("callback 0")
					},
				},
				{
					text: "value: 1",
					callback: () => {
						console.log("callback 1")
					},
				},
				{
					text: "value: 2",
					callback: () => {
						console.log("callback 2")
					},
				},
				{
					text: "value: 3",
					callback: () => {
						console.log("callback 3")
					},
				},
				{
					text: "value: 0",
					callback: () => {
						console.log("callback 0")
					},
				},
				{
					text: "value: 1",
					callback: () => {
						console.log("callback 1")
					},
				},
				{
					text: "value: 2",
					callback: () => {
						console.log("callback 2")
					},
				},
				{
					text: "value: 3",
					callback: () => {
						console.log("callback 3")
					},
				},
			],
		})
	}

	const changeLanguage = (lang: string) => () => {
		setCookie("lang", lang, 365)
		i18n.changeLanguage(lang)
	}

	return (
		<div className={"navbar " + className}>
			<Link to="/">
				<Logo />
			</Link>
			<div>
				<Switch>
					<Route path="/list">
						<h2>{t("list.list")}</h2>
					</Route>
					<Route path="/song/*">
						<h2>{t("edit.edit")}</h2>
					</Route>
					<Route path="/">
						<h2>{t("menu.menu")}</h2>
					</Route>
				</Switch>
				<h6>Debug pathname</h6>
				<h6>{location.pathname}</h6>
			</div>
			<Button color="greyLight" onClick={displayPrompt}>
				DEBUG prompt
			</Button>
			<div className="lang">
				<span onClick={changeLanguage("pl")}>🇵🇱</span>
				<span onClick={changeLanguage("en")}>🇺🇸</span>
			</div>
		</div>
	)
}
export default Navbar
