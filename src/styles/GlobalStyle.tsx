import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: blue;
    font-size: 16px;
    font-family: "Comic Sans MS", "Comic Sans", sans-serif;
  }

  *:focus {
    outline: 1px solid black;
  }
`;

export default GlobalStyle;
