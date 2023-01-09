import React from 'react';
import { LanguageSwitch } from 'app/components/LanguageSwitch';
import Avatar from './avatarDropdown';
import { ActionMenu } from './actionMenu';

const GlobalHeaderRight: React.FC = () => {
  return (
    <>
      <Avatar />
      <ActionMenu>
        <LanguageSwitch />
      </ActionMenu>
    </>
  );
};
export default GlobalHeaderRight;
