import styled, { css } from "styled-components"
import { default as ButtonComp, ButtonProps } from "./Button"
import { colors } from "../../../Styles/GlobalStyle"
import { darken } from "polished"

const ButtonStyle = css<{ color: string }>`
	border: 0.2em solid;
	border-radius: 0.5em;
	color: ${colors.font};
	cursor: pointer;
	padding: 0.3em;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.1em;
	transition: background-color 0.15s ease-in-out;
	border-color: ${(props) => colors[props.color]};
	background-color: ${(props) => colors[props.color]};
	&:hover {
		background-color: ${(props) => darken(0.05, colors[props.color])};
	}
`

const Button = styled(ButtonComp)<{ color: string } & ButtonProps>`
	${(props) => ButtonStyle}
`
export { ButtonStyle }
export default Button
