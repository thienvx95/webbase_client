import { LanguageSwitch } from 'app/components/LanguageSwitch';
import { ThemeSwitch } from 'app/components/ThemeSwitch';
import React from 'react';
import styled from 'styled-components/macro';

export const LoginTopHeaderContainer = styled.div`
  width: 100%;
  height: 40px;
  line-height: 44px;
  text-align: right;
  .ant-dropdown-trigger {
    margin-right: 24px;
  }
`;

interface LoginTopHeaderProps {}

export const LoginTopHeader = (props: LoginTopHeaderProps) => {
  return (
    <LoginTopHeaderContainer>
      <ThemeSwitch />
      <LanguageSwitch />
    </LoginTopHeaderContainer>
  );
};
