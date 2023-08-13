import { LockOutlined } from '@ant-design/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { messages } from './messages';

export const PasswordViewHeaderContainer = styled.div`
  display: flex;
  .icon {
    font-size: 20px;
    padding: 5px 10px 5px 5px;
    color: #a9a9a9;
  }
`;

export const PasswordViewHeader: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PasswordViewHeaderContainer>
      <div className="icon">
        <LockOutlined rev={undefined} />
      </div>
      <div>
        <h5>{t(messages.title())}</h5>
        <h5> {t(messages.description())}</h5>
      </div>
    </PasswordViewHeaderContainer>
  );
};
