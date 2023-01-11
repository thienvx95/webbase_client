import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const LeftMenu = styled.div`
  width: 224px;
  border-right: ${p =>
    `${p.theme.borderWidthBase} ${p.theme.borderStyleBase} ${p.theme.borderColorSplit}`};
  :global {
    .ant-menu-inline {
      border: none;
    }
    .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
      font-weight: bold;
    }
  }
  ${media.maxmd} {
    width: 100%;
    border: none;
  }
`;
