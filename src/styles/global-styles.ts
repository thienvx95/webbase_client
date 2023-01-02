import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    color: rgba(0,0,0,.85);
    font-size: 14px;
    font-family: -apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji;
    font-variant: tabular-nums;
    line-height: 1.5715;
    font-feature-settings: "tnum","tnum";
    background-color: ${p => p.theme.background};
  }

  body.fontLoaded {
    font-family: 'Inter', -apple-system,BlinkMacSystemFont,segoe ui,Roboto,helvetica neue,Arial,noto sans,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol,noto color emoji;
  }
`;
