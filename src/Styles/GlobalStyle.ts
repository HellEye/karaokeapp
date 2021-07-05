import { createGlobalStyle } from "styled-components"

export const colors: { [key: string]: string } = {
	blueNormal: "#033076",
	blueMedium: "#003891",
	blueLight: "#0844a4",
	greyDark: "#181818",
	greyNormal: "#232323",
	greyLight: "#4b4237",
	greyLighter: "#595247",
	font: "#ffffff",
	errorDark: "#840705",
	error: "#e61610",
	warn: "#f4eb49",
	accent: "purple",
}

export const layout = {
	navHeight: "125px",
}

export const GlobalStyle = createGlobalStyle`
  
.App {
	background-color: ${colors.greyLight};
	color: ${colors.font};
	height: 100vh;
	width: 100vw;
	position: absolute;
  box-sizing: border-box;
}

html,
body,
#root {
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0;
  overflow:hidden;
	padding: 0;
}

a,
h1,
h2,
h3,
h4,
h5,
h6 {
	padding: 0;
	margin: 0;
	color:${colors.font};
}


`
