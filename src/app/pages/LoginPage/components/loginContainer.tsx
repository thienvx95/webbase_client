import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: ${p => p.theme.background};
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  background-color: ${p => p.theme.background};
  ${media.md} {
    background-image: url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg');
  }
`;
