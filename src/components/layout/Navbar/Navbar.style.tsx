import styled from 'styled-components';
import { colors, layout } from "../../../Styles/GlobalStyle"
import { default as NavbarComponent } from "./Navbar"

const Navbar = styled(NavbarComponent)`
background-color: ${colors.blueNormal};
	padding: 1em;
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
	height: ${layout.navHeight};
	align-items: center;
	justify-content: space-between;
	width: 100%;
	font-size: 1.5em;
	.Logo {
		margin-right: 4em;
		img {
			height: calc(${layout.navHeight} * 0.8);
			image-rendering: -moz-crisp-edges; /* Firefox */ 
			image-rendering: -o-crisp-edges; /* Opera */
			image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming) */
			image-rendering: crisp-edges;
			-ms-interpolation-mode: nearest-neighbor;
		}
	}
	.lang {
		font-size: 0.6em;
		margin-left: auto;
		display: flex;

		flex-direction: column;
		align-items: flex-start;
		height: 100%;
	}
  `

  export default Navbar