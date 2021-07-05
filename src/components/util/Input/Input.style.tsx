import styled from "styled-components"
import { colors } from "Styles/GlobalStyle"

const Input = styled.input<{ color: string }>`
	background-color: ${(props) => colors[props.color]};
	box-sizing: border-box;
	border: none;
	padding: 0.8em 1.5em;
	border-radius: 0.5em;
	color: ${colors.font};

	&:focus {
		outline: 0.2em solid ${colors.accent};
	}
`

export default Input
