import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useMemo } from 'react';
import { flushSync } from 'react-dom';
import { AvatarName } from './avatarName';
import { useAuth } from 'utils/hooks/useAuth';
import { ActionMenu } from './actionMenu';
import { AvatarLogo } from './avatar';
import { HeaderDropdown } from 'app/components/HeaderDropdown';
import { useSelector } from 'react-redux';
import { selectDashboardSettings } from 'providers/layout/slice/selectors';
import { useTranslation } from 'react-i18next';
import { commonMessages } from 'app/messages';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from 'app/pages/DashBoard/UserSettingPage/slice/selectors';

export type GlobalHeaderRightProps = {};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const settings = useSelector(selectDashboardSettings);
  const menuItems = useMemo(() => {
    return [
      {
        key: 'settings',
        icon: <SettingOutlined rev={undefined} />,
        label: t(commonMessages.userSettingMenu()),
      },
      {
        type: 'divider' as const,
      },
      {
        key: 'logout',
        icon: <LogoutOutlined rev={undefined} />,
        label: t(commonMessages.logoutMenu()),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMenuClick = useCallback((event: MenuInfo) => {
    const { key } = event;
    if (key === 'logout') {
      flushSync(() => {
        logout();
      });
      navigate('/');
      return;
    }
    navigate(`dashboard/account/${key}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = (
    <ActionMenu>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </ActionMenu>
  );

  if (!currentUser || !currentUser.lastName) {
    return loading;
  }

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
      icon={
        <ActionMenu>
          <AvatarLogo src={currentUser?.avatar} />
          {settings?.layout !== 'side' ? (
            <AvatarName className="anticon">{`${currentUser?.firstName} ${currentUser?.lastName}`}</AvatarName>
          ) : null}
        </ActionMenu>
      }
    ></HeaderDropdown>
  );
};

export default AvatarDropdown;
