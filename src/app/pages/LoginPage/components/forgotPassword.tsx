import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { messages } from '../messages';

export interface ForgotPasswordType {
  href: string;
  onClick: Function;
}

export const ForgotPasswordWrapper = styled.a`
  float: right;
`;

export const ForgotPassword: React.FC<ForgotPasswordType> = props => {
  const { t } = useTranslation();
  return (
    <ForgotPasswordWrapper href={props.href} onClick={() => props.onClick}>
      {t(messages.forgotPassword())}
    </ForgotPasswordWrapper>
  );
};
