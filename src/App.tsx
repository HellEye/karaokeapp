//import "./res/css/index.css"
import Navbar from "./components/layout/Navbar/Navbar.style"
import Content from "./components/layout/Content/Content"
import { BrowserRouter } from "react-router-dom"
import { GlobalStyle } from "./Styles/GlobalStyle"
import PromptManager from "components/util/Prompt/PromptManager.style"
// import mainStore from "./store/mainStore"
function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<PromptManager />
			<div className="App">
				<Navbar />
				<Content />
			</div>
		</BrowserRouter>
	)
}

export default App
