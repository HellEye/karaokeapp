import styled from "styled-components"
import { colors } from "Styles/GlobalStyle"
import { default as Component } from "./InputField"

const InputField = styled(Component)`
	position: relative;
	width: max(10em, 60%);

	.text {
		font-size: 1rem;
		padding-right: 2em;
		width: 100%;
	}

	.fileIcon {
		position: absolute;
		top: 0;
		color: ${colors.font + "aa"};
		right: 0.6rem;
		cursor: pointer;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		transition: color 0.15s ease, font-size 0.15s ease, right 0.15s ease;

		&:hover {
			font-size: 1.8em;
			right: 0.25em;
			color: ${colors.font};
		}
	}
`
export default InputField
