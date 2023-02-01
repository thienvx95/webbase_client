import { PageLoading, ProForm, ProFormText } from '@ant-design/pro-components';
import { UserDetail } from 'api/user/models/userDetail';
import { FormPhone, FormGroup, FormText } from 'app/components/Form';
import { FormSelectCountry } from 'app/components/Form/FormSelectCountry';
import { buttonMessages } from 'app/messages';
import { selectLoading } from 'providers/layout/slice/selectors';
import React from 'react';
import i18next from 'i18next';
import { useSelector } from 'react-redux';
import { AvatarView } from './avatarView';
import { BaseViewContainer } from './baseViewContainer';
import { LeftForm } from './leftForm';
import { RightForm } from './rightForm';
import { useDispatch } from 'react-redux';
import { selectCurrentUser } from '../../slice/selectors';
import { userSettingActions } from '../../slice';

export const BaseView: React.FC = () => {
  const { t } = i18next;
  const loading = useSelector(selectLoading);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleFinish = async values => {
    dispatch(userSettingActions.updateCurrentUser(values));
  };
  return (
    <BaseViewContainer>
      <LeftForm>
        <ProForm
          layout="vertical"
          submitter={{
            searchConfig: {
              submitText: t(buttonMessages.submit()),
            },
            submitButtonProps: {
              loading: loading,
            },
            render: (_, dom) => dom[1],
          }}
          initialValues={{
            ...currentUser,
            phoneNumber: currentUser?.mobile?.split('-'),
          }}
          onFinish={async values => {
            if (values.phoneNumber) {
              values.mobile = values.phoneNumber?.join('-');
              delete values.phoneNumber;
            }
            await handleFinish(values as UserDetail);
          }}
          hideRequiredMark
        >
          <FormGroup name="fullname" size={8}>
            <ProFormText name="_id" hidden />
            <FormText
              width="sm"
              name="firstName"
              hideLabel
              required
              maxLength={50}
            />
            <FormText
              width="sm"
              name="lastName"
              hideLabel
              required
              maxLength={50}
            />
            <FormText width="lg" name="email" required email maxLength={50} />
          </FormGroup>
          <FormGroup name="address" size={8}>
            <FormText width="lg" name={['address', 'address1']} hideLabel />
            <FormText width="lg" name={['address', 'address2']} hideLabel />
            <FormText width="sm" name={['address', 'province']} hideLabel />
            <FormText width="sm" name={['address', 'city']} hideLabel />
            <FormText width="sm" name={['address', 'zipCode']} hideLabel />
            <FormSelectCountry
              width="sm"
              name={['address', 'country']}
              hideLabel
            />
          </FormGroup>
          <FormPhone name="phoneNumber" />
        </ProForm>
      </LeftForm>
      <RightForm>
        <AvatarView avatar={currentUser?.avatar ?? ''} />
      </RightForm>
    </BaseViewContainer>
  );
};
