import styled from "styled-components"
import { colors } from "../../../Styles/GlobalStyle"
import { default as SongListComp } from "./SongList"

const headerHeight = "2.5em"

const SongList = styled(SongListComp)`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	justify-content: flex-start;
	align-items: stretch;
	flex-shrink: 1;
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.header {
		display: flex;
		flex-direction: row;
		font-size: 1.2em;
		min-height: ${headerHeight};
		max-height: ${headerHeight};
		padding-right: 2em;
		margin-bottom: 0.3em;
		align-items: center;
		justify-content: center;
	}
	.list {
		display: flex;
		flex-direction: column;
		padding-top: 0.2em;
		max-height: 90%;
	}

	.header,
	.list {
		width: min(1000px, 100%);
	}

	.header {
		.search {
			input {
				padding: 0.5em 0.8em;
			}
		}
		.filter {
			margin-left: auto;
			height: fit-content;
			border-radius: 0.3em;
			padding: 0.2em;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 0.4em;
			transition: background-color 0.15s ease-in-out;
			cursor: pointer;
		}
		.filter:hover {
			background-color: ${colors.blueLight};
		}
	}
	.content {
		padding-right: 0.1em;
	}

	.contentBottom {
		display: flex;
		flex-direction: row;
		height: fit-content;
		.button {
			display: flex;
			flex-direction: row;
			height: 3em;
			width: 13em;
			justify-content: center;
			align-items: center;
			background-color: ${colors.blueLight};
			font-weight: bold;
			font-size: 1.3em;
			border-radius: 0.4em;
			padding: 0.5em;
			box-sizing: border-box;
			.icon {
				font-size: 1.5em;
				margin-right: 0.3em;
			}
		}
	}

	.list > div {
		/* width */
		&::-webkit-scrollbar {
			width: 6px;
			right: 0;
			position: absolute;
		}

		/* Track */
		&::-webkit-scrollbar-track {
			background: ${colors.greyNormal};
			border-radius: 10px;
		}

		/* Handle */
		&::-webkit-scrollbar-thumb {
			background: ${colors.greyLight};
			border-radius: 10px;
			max-height: 5px;
			transition: background-color 0.15s ease-in-out;
		}

		/* Handle on hover */
		&::-webkit-scrollbar-thumb:hover {
			background: ${colors.blueLight};
		}

		.songWrapper {
			height: 60px;
			max-height: 60px;
		}
	}
`

export default SongList
