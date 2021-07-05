import styled from 'styled-components';
import { default as MenuComponent } from "./Menu"

const layout = {
  gridGap: "1em",
  topHeight: "3em",
  elemHeight:"3em",
  firstWidth: "10em"
}

const gridTemplateRows = `${layout.topHeight} ${layout.elemHeight} ${layout.elemHeight}`

const Menu = styled(MenuComponent)`
.content {
    display:grid;
    grid-template-rows: ${gridTemplateRows};
    grid-template-columns: ${layout.firstWidth} auto;
    grid-template-areas: "top top" "browse path" "link empty";
    
    gap:${layout.gridGap};
    h1 {
      grid-area:top;
    }
    input, h3 {
      grid-area:path;
    }
    button {
      grid-area:browse;
    }
    a{
      grid-area:link;
    }
  }
  .pathSelect {
    display:flex;
    flex-direction:row;
    align-items: center;
    :first-child {
      margin-right: 3em;
    }
  }

  a {
    display:flex;
    justify-content: center;
    text-decoration: none;
    align-items: center;
  }
  h3 {
    display:flex;
    align-items:center;
  }

  .linkButton {
    grid-area: link;
  }
  `
  export default Menu