import styled from "styled-components"
import { colors } from "../../../Styles/GlobalStyle"
import { default as WarnIconComponent } from "./WarnIcon"

const WarnIcon = styled(WarnIconComponent)`
	position: relative;

	.floatingBox {
		max-width: 30vw;
		min-width: 20em;
		position: absolute;
		right: 50%;
		z-index: 1;
		background-color: ${colors.greyNormal};
		border-radius: 1em;
		border: 2px solid ${colors.font};
		padding: 1em;
		ul {
			padding-left: 0;
			list-style-type: none;
			margin-bottom: 0.2rem;
			li {
				margin-bottom: 0.2rem;
			}
		}

		.errorList {
			display: flex;
			flex-direction: row;
			margin-bottom: 0.5em;
			align-items: center;

			.tags {
				margin-left: 0.5em;
			}
		}
	}
`
export default WarnIcon
