import styled from "styled-components"
import { PromptManager as Component } from "./Prompt"
import { colors } from "Styles/GlobalStyle"

const PromptManager = styled(Component)`
	position: absolute;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${colors.greyDark}99;
	z-index: 3;

	.prompt {
		padding: 2em;
		width: 38vw;
		height: 22vh;
		background-color: ${colors.blueMedium};
		display: flex;
		flex-direction: column;
		border-radius: 1em;
		border: 5px solid ${colors.blueNormal};
	}
	h2 {
		margin-bottom: 1em;
		width: 100%;
		text-align: center;
	}

	h4 {
		margin-bottom: 0.5em;
	}

	.buttons {
		display: flex;
		justify-self: flex-end;
		flex-direction: row;
		justify-content: flex-end;
		margin-top: auto;
		gap: 1em;
		flex-wrap: wrap;
		.promptButton {
			min-width: 80px;
		}
	}
`
export default PromptManager
