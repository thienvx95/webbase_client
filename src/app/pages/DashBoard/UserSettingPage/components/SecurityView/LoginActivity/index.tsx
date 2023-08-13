import React from 'react';
import { Card, Collapse, CollapseProps, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { userSettingActions } from '../../../slice';
import { useSelector } from 'react-redux';
import {
  selectCurrentUserLoginActivity,
  selectUserIpLookup,
} from '../../../slice/selectors';
import { isEmpty } from 'lodash';
import { CurrentLocation } from './currentLocation';
import { CurrentUserLoginActivities } from './currentUserLoginActivities';
import { HeaderPanel } from 'app/components/Collapse/HeaderPanel';

export const LoginActivityView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userIpLookup = useSelector(selectUserIpLookup);
  const userLoginActivity = useSelector(selectCurrentUserLoginActivity);

  const onCollapse = (key: string | Array<string>): void => {
    if (!isEmpty(key)) {
      if (!userIpLookup) {
        dispatch(userSettingActions.fetchUserIpLookup());
      }
      if (!userLoginActivity) {
        dispatch(userSettingActions.fetchCurrentUserLoginActivities());
      }
    }
  };

  const items: CollapseProps['items'] = [
    {
      label: (
        <HeaderPanel
          icon={<EnvironmentOutlined rev={null} />}
          title={t(messages.title())}
          description={t(messages.description()) ?? ''}
        />
      ),
      key: 'loginActivity',
      children: (
        <Card bordered={false}>
          <CurrentLocation />
          <Divider style={{ marginBottom: 32 }} />
          <CurrentUserLoginActivities />
        </Card>
      ),
    },
  ];
  return (
    <Collapse
      expandIconPosition="end"
      onChange={onCollapse}
      items={items}
    ></Collapse>
  );
};

export default LoginActivityView;
