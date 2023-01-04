import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const LoginFormContainer = styled.div`
  flex: 1;
  padding: 32px 0;
  .icon {
    margin-left: 8px;
    color: ${p => p.theme.textSecondary};
    font-size: 24px;
    vertical-align: middle;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: ${p => p.theme.text};
    }
  }
  ${media.md} {
    padding: 32px 0 24px;
  }
`;
