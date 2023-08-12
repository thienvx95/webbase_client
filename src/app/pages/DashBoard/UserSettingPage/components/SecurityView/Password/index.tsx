import React, { useMemo, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Collapse } from 'antd';
import { ChangePasswordParams } from 'api/user/models';
import { useTranslation } from 'react-i18next';
import { PasswordChecker } from 'utils/passwordChecker';
import { messages } from './messages';
import { ViewHeader } from '../component/viewHeader';
import { buttonMessages, formMessages } from 'app/messages';
import { LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { userSettingActions } from '../../../slice';
import { useSelector } from 'react-redux';
import { selectLoading } from 'providers/layout/slice/selectors';

const { Panel } = Collapse;

const PasswordStrength = styled.span`
  .strength {
    font-weight: bold;
  }
  .strong {
    color: #00ff00;
  }
  .medium {
    color: #ffff00;
  }
  .weak {
    color: #ff0000;
  }
  .veryweak {
    color: #ff0000;
  }
`;
export const ChangePasswordView: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [disableButton, setDisableButton] = useState(true);
  const [passStrength, setPassStrength] = useState(null);

  const passwordStrength = useMemo(() => {
    return {
      strong: <span className="strength strong">{t(messages.strong())}</span>,
      medium: <span className="strength medium">{t(messages.medium())}</span>,
      weak: <span className="strength weak">{t(messages.weak())}</span>,
      veryweak: (
        <span className="strength veryweak">{t(messages.veryWeak())}</span>
      ),
    };
  }, [t]);

  const handleSubmit = async (data: ChangePasswordParams): Promise<void> => {
    dispatch(userSettingActions.changePassword(data));
  };

  const onValuesChange = (changeValues: any) => {
    if (changeValues.newPassword) {
      const check = PasswordChecker.passwordStrength(changeValues.newPassword);
      setPassStrength(check.value);
      if (['medium', 'strong'].includes(check.value)) {
        setDisableButton(false);
      }
    }
  };
  return (
    <Collapse expandIconPosition="end">
      <Panel
        header={
          <ViewHeader
            icon={<LockOutlined />}
            title={t(messages.title())}
            description={t(messages.description())}
          />
        }
        key="changePassword"
      >
        {passStrength ? (
          <PasswordStrength>
            {t(messages.passwordStrength())} ：
            {passwordStrength[passStrength || 'veryweak']}
          </PasswordStrength>
        ) : null}
        <ProForm
          initialValues={{}}
          onValuesChange={onValuesChange}
          submitter={{
            searchConfig: {
              submitText: t(buttonMessages.saveChange()),
            },
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              loading: loading,
              disabled: disableButton,
            },
          }}
          hideRequiredMark
          onFinish={async values => {
            handleSubmit(values as ChangePasswordParams);
          }}
        >
          <ProFormText.Password
            name="currentPassword"
            label={t(formMessages.title('currentPassword'))}
            placeholder={t(formMessages.title('currentPassword')) || ''}
            rules={[
              {
                required: true,
                message: `${t(formMessages.require('currentPassword'))}`,
              },
            ]}
          />
          <ProFormText.Password
            name="newPassword"
            label={t(formMessages.title('newPassword'))}
            placeholder={t(formMessages.title('newPassword')) || ''}
            rules={[
              {
                required: true,
                message: `${t(formMessages.require('newPassword'))}`,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('currentPassword') !== value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(`${t(formMessages.invalid('newPassword'))}`),
                  );
                },
              }),
            ]}
          />
          <ProFormText.Password
            name="confirmPassword"
            label={t(formMessages.title('confirmPassword'))}
            placeholder={t(formMessages.title('confirmPassword')) || ''}
            rules={[
              {
                required: true,
                message: `${t(formMessages.require('confirmPassword'))}`,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(`${t(formMessages.invalid('confirmPassword'))}`),
                  );
                },
              }),
            ]}
          />
        </ProForm>
      </Panel>
    </Collapse>
  );
};

export default ChangePasswordView;
