import styled from "styled-components"
import { default as Component } from "./ContentWrapper"
import { colors, layout } from "Styles/GlobalStyle"

const wrapperHeight = `calc(100vh - ${layout.navHeight})`
const bottomHeight = `calc( ${wrapperHeight} / 6)`
const mainHeight = `calc(${wrapperHeight} * 5/6)`
const ContentWrapper = styled(Component)`
	.content {
		box-sizing: border-box;
		height: ${mainHeight};
		border-radius: 1em;
		background-color: ${colors.greyNormal};
		padding: 1em;
	}

	.contentBottom {
		padding: 1em;
		height: ${bottomHeight};
		box-sizing: border-box;
	}

	height: ${wrapperHeight};
	max-height: ${wrapperHeight};
	background-color: ${colors.greyLight};
	box-sizing: border-box;
	padding: 1em;
	display: grid;
`

export default ContentWrapper
