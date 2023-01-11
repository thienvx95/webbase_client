import styled from 'styled-components/macro';
import { media } from 'styles/media';

export const BaseViewContainer = styled.div`
  display: flex;
  padding-top: 12px;

  :global {
    .ant-legacy-form-item .ant-legacy-form-item-control-wrapper {
      width: 100%;
    }
  }

  ${media.maxxl} {
    flex-direction: column-reverse;
  }
`;
