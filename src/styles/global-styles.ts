import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
  }

  body {
    font-size: 14px;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background-color: ${p => p.theme.background};
    color: ${p => p.theme.text};
  }

  body.fontLoaded {
    font-family: 'Inter', -apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji;
  }
  p,
  label {
    line-height: 1.5em;
  }
  input, select, button {
    font-family: inherit;
    font-size: inherit;
  }
`;
