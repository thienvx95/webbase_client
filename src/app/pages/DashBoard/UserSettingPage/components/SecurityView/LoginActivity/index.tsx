import React, { useEffect } from 'react';
import { Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { ViewHeader } from '../component/viewHeader';
import { messages } from './messages';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { userSettingActions } from '../../../slice';
import { useSelector } from 'react-redux';
import { selectUserInformation } from '../../../slice/selectors';

const { Panel } = Collapse;

export const LoginActivityView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userInformation = useSelector(selectUserInformation);
  useEffect(() => {
    if (!userInformation) {
      dispatch(userSettingActions.fetchUserInformation());
    }
  }, []);

  console.log('🚀 ~ file: index.tsx:18 ~ userInformation', userInformation);
  return (
    <Collapse expandIconPosition="right">
      <Panel
        header={
          <ViewHeader
            icon={<EnvironmentOutlined />}
            title={t(messages.title())}
            description={t(messages.description())}
          />
        }
        key="loginActivity"
      ></Panel>
    </Collapse>
  );
};

export default LoginActivityView;
