import styled from 'styled-components/macro';

export const ActionMenu = styled.span`
  display: flex;
  height: 48px;
  overflow: hidden;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;
  border: ${p => p.theme.borderRadius};
  &:hover {
    background-color: ${p => p.theme.colorBgTextHover};
  }
`;
