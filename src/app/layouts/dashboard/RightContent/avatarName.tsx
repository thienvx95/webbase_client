import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const AvatarName = styled.span`
  width: 70px;
  height: 48px;
  overflow: hidden;
  line-height: 48px;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${media.maxmd} {
    display: none;
  }
`;
