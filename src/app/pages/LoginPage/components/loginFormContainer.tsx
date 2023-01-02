import styled from 'styled-components/macro';

export const LoginFormContainer = styled.div`
  flex: 1;
  padding: 32px 0;
  .icon {
    margin-left: 8px;
    color: rgba(0, 0, 0, 0.2);
    font-size: 24px;
    vertical-align: middle;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: @primary-color;
    }
  }
`;
