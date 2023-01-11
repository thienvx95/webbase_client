import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const UserSettingContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
  background-color: ${p => p.theme.menuBg};
  :global {
    .ant-list-split .ant-list-item:last-child {
      border-bottom: 1px solid ${p => p.theme.borderColorSplit};
    }
    .ant-list-item {
      padding-top: 14px;
      padding-bottom: 14px;
    }
  }

  ${media.maxmd} {
    flex-direction: column;
  }
`;
