import React from 'react';
import { Card, Collapse, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { ViewHeader } from '../component/viewHeader';
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

const { Panel } = Collapse;

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
  return (
    <Collapse expandIconPosition="end" onChange={onCollapse}>
      <Panel
        header={
          <ViewHeader
            icon={<EnvironmentOutlined />}
            title={t(messages.title())}
            description={t(messages.description())}
          />
        }
        key="loginActivity"
      >
        <Card bordered={false}>
          <CurrentLocation />
          <Divider style={{ marginBottom: 32 }} />
          <CurrentUserLoginActivities />
        </Card>
      </Panel>
    </Collapse>
  );
};

export default LoginActivityView;
