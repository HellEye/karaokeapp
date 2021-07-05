import styled from "styled-components"
import { default as EditFieldComponent } from "./EditField"
import { colors } from "Styles/GlobalStyle"
const EditField = styled(EditFieldComponent)`
	display: flex;
	flex-direction: row;
	margin-bottom: 0.5em;
	.label {
		padding-left: 1em;
		display: flex;
		align-items: center;
		width: max(20%, 8em);
	}

	.deleteButton {
		margin-left: 1em;
		width: 3rem;
	}
`
export default EditField
