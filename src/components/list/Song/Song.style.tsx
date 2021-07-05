import styled from "styled-components"
import { colors } from "Styles/GlobalStyle"
import { default as SongComponent } from "./Song"

const iconWidth = "1.5rem"
const iconSpacing = "0.6rem"

const Song = styled(SongComponent)`
	display: flex;
	flex-direction: row;
	font-size: 1.1em;
	margin-right: 1em;
	border-radius: 0.5em;
	background-color: ${colors.blueLight};
	padding: 0.6em 2em;
	padding-right: 1em;

	&.error {
		background-color: ${colors.errorDark};
	}

	span.bold {
		font-weight: bold;
	}

	span.italic {
		font-style: italic;
	}

	.icons {
		display: flex;
		flex-direction: row;
		margin-right: 0;
		margin-left: auto;
		width: 9rem;
		justify-content: flex-end;
		align-items: center;
		> div,
		> a {
			width: ${iconWidth};
			height: 1.5rem;
			margin-left: ${iconSpacing};
		}
		& :last-child {
			margin-left: calc(${iconSpacing} / 3);
		}
	}
`
export default Song
