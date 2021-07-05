import styled from "styled-components"
import { colors } from "Styles/GlobalStyle"

import { default as PlayerComponent } from "./Mp3Player"

const Mp3Player = styled(PlayerComponent)`
	background-color: ${colors.greyLight};
	display: flex;
	flex-direction: row;
	border-radius: 0.5em;
	padding: 0.3em;

	align-items: stretch;
	align-self: stretch;
	justify-content: stretch;

	.duration {
		margin-left: 1.5em;
		font-size: 1.3em;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.playIcon {
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			font-size: 2rem;
		}
	}
`

export default Mp3Player
