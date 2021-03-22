import styled, { ThemeProvider } from "styled-components";
import "destyle.css";

import theme from "styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <S.App>test 2</S.App>
    </ThemeProvider>
  );
}

const S = {} as any;

S.App = styled.div`
  background-color: red;
  color: ${(p) => p.theme.color.white};
`;

export default App;
