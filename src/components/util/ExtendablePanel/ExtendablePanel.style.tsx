import styled from "styled-components"
import { colors } from "Styles/GlobalStyle"
import { default as Component } from "./ExtendablePanel"

const transitionDuration = "0.2s"
const ExtendablePanel = styled(Component)`
	display: flex;
	flex-direction: column;
	* {
		box-sizing: border-box;
	}
	height: 100%;
	width: 100%;
	box-sizing: border-box;

	.tabPanel {
		flex-basis: 0%;
		display: flex;
		flex-direction: column;
		transition: flex-basis ${transitionDuration} ease;
		&:first-child .tabHeader {
			border-radius: 0 1em 0 0;
		}

		input[type="radio"] {
			visibility: hidden;
			height: 0;
			width: 0;
			margin: 0;
			padding: 0;
		}
		.tabHeader {
			display: block;
			box-sizing: border-box;
			width: 100%;
			background-color: ${colors.blueMedium};
			padding: 0.5em;
		}

		.tabContent {
			background-color: transparent;
			box-sizing: border-box;
			height: 0;
			transition: height ${transitionDuration} ease;
			> div {
				padding: 0.5em;
			}
		}
	}
	.tabPanel.panel--checked {
		flex-basis: 100%;
		.tabHeader {
			background-color: ${colors.blueLight};
		}
		.tabContent > div {
			display: flex;
			align-items: stretch;
			justify-content: stretch;
		}
	}

	.tabPanel.panel--unchecked {
		&:last-child .tabHeader {
			border-radius: 0 0 1em 0;
		}
	}
`

export default ExtendablePanel
