import styled from "styled-components"
import {
	default as LinkButtonComponent,
	LinkButtonProps,
} from "./LinkButton"
import { ButtonStyle } from "../Button/Button.style"

const LinkButton = styled(LinkButtonComponent)<
	{ color: string } & LinkButtonProps
>`
	a {
		height: 100%;
		width: 100%;
	}
	${(props) => ButtonStyle}
`

export default LinkButton
