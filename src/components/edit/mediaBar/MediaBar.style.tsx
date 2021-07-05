import styled from "styled-components"
import { default as MediaBarComponent } from "./MediaBar"
import { colors } from "Styles/GlobalStyle"
const MediaBar = styled(MediaBarComponent)`
	background-color: ${colors.greyDark};
	width: max(25%, 15em);
	height: 100%;
	border-radius: 1em 0 0 1em;
	box-sizing: border-box;
	padding: 1em;

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2em;
	> h3 {
		text-align: center;
	}

	.coverImage,
	.backgroundImage,
	.video {
		height: 25%;
	}
	.coverImage {
	}

	.backgroundImage {
	}
	img {
		border-radius: 1em;
		max-height: 100%;
		max-width: 100%;
	}

	.video {
	}
`

export default MediaBar
