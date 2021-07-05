import { colors } from "../../../Styles/GlobalStyle"
import { default as SearchComp } from "./Search"
import styled from "styled-components"

const focusBorderRadius = "3px"

export const Search = styled(SearchComp)`
	background-color: ${colors.blueLight};
	height: fit-content;
	border-radius: 2em;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: 0em;
	position: relative;
	.searchIcon {
		position: absolute;
		left: 0.2em;
	}
	input.text {
		color: ${colors.font};

		box-sizing: border-box;
		margin: 0.2em 0.4em;
		background-color: ${colors.blueLight};
		border-radius: 2em;
		padding: 0.45em;
		text-align: left;
		padding-left: 3em;
		border: ${focusBorderRadius} solid ${colors.blueLight};
		transition: border-color 0.2s ease-in-out;
		margin: 0;
	}
	input.text:focus {
		outline: none;
		border: ${focusBorderRadius} solid ${colors.accent};
	}
`
