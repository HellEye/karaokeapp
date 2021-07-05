import React from "react"
import { Route, Switch } from "react-router-dom"
import Menu from "../Menu/Menu.style"
import SongList from "../../list/SongList/SongList.style"
import { observer } from "mobx-react"
import SongEdit from "../../edit/SongEdit.style"

export default observer(function Content() {
	//TODO logging in
	// const { t } = useTranslation()

	return (
		<Switch>
			<Route path="/list">
				<SongList />
			</Route>
			<Route path="/song/:index">
				<SongEdit />
			</Route>
			<Route path="/">
				<Menu />
			</Route>
		</Switch>
	)
})
