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
    background-color: ${p => p.theme.background};
    color: ${p => p.theme.text};
  }

  input {
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    opacity: 1; /* Firefox */
  }

  .ant-pro-form-group-title {
    margin-block-end: 16px;
  }
}

`;
