import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const RightMenu = styled.div`
  flex: 1;
  padding: 8px 40px;
  .title {
    margin-bottom: 12px;
    color: ${p => p.theme.headingColor};
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }
  ${media.maxmd} {
    padding: 40px;
  }
`;
