import styled from "styled-components"
import { default as Component } from "./AddTag"
import { colors } from "Styles/GlobalStyle"

const AddTag = styled(Component)`
	display: flex;
	flex-direction: row;

	display: flex;
	flex-direction: row;
	margin-bottom: 0.5em;
	.label {
		padding-left: 1em;
		display: flex;
		align-items: center;
		width: max(20%, 8em);
	}
	.text {
		font-size: 1rem;
		padding-right: 2em;
		width: max(10em, 60%);
	}
	.icon {
		margin-left: 1em;
		width: 3rem;
	}

	.newTag {
		margin-left: 1em;
		/* margin-top: 1em; */
		width: 8em;
	}
`
export default AddTag
