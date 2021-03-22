import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import "destyle.css";

import theme from "styles/theme";
import GlobalStyle from "styles/GlobalStyle";
import { fetchRandomCatFact } from "services/cat-facts";

function App() {
  const [catFact, setCatFact] = useState<string | null>(null);

  const getRandomCatFact = () => {
    setCatFact(null);

    fetchRandomCatFact()
      .then((response) => {
        setCatFact(response.data.text);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    getRandomCatFact();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle></GlobalStyle>

      <S.App>
        <div className="App__main-block">
          <div className="App__catFact-block">
            {!catFact && <div>Loading...</div>}

            {catFact && (
              <div className="App__catFact" data-testid="cat-fact">
                {catFact}
              </div>
            )}
          </div>

          {catFact && (
            <button
              className="App__refetchButton"
              onClick={getRandomCatFact}
              data-testid="refetch-cat-fact-button"
            >
              Tell me another one!
            </button>
          )}
        </div>
      </S.App>
    </ThemeProvider>
  );
}

const S = {} as any;

S.App = styled.div`
  height: 100vh;
  width: 38%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .App__main-block {
    text-align: center;
    color: ${(p) => p.theme.color.white};
  }

  .App__catFact-block {
    margin-bottom: 3rem;
  }

  .App__catFact {
    line-height: 150%;
    font-size: 2rem;
  }

  .App__refetchButton {
    height: 2.5rem;

    &:hover {
      color: yellow;
    }
  }
`;

export default App;
