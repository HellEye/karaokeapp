import styled from "styled-components"
import { default as SongEditComponent } from "./SongEdit"
import { colors } from "Styles/GlobalStyle"
const SongEdit = styled(SongEditComponent)`
	&.contentWrapper {
		.content {
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			padding: 0;
		}

		.contentBottom {
			display: flex;
			align-items: flex-end;
			flex-direction: column;
			justify-content: center;
			height: 5em;
		}
		.fieldWrapper {
			display: flex;
			flex-direction: column;
			width: 100%;
			padding: 0.8em 0.2em;
		}
	}
	.accordionHeader {
		padding: 0.2em 0.8em;
	}
`

export default SongEdit
