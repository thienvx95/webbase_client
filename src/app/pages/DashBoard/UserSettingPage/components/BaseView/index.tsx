import {
  ProForm,
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProSkeleton,
} from '@ant-design/pro-components';
import { Input, message } from 'antd';
import { buttonMessages, formMessages } from 'app/messages';
import { selectCurrentUser } from 'providers/auth/slice/selectors';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAuth } from 'utils/hooks/useAuth';
import { BaseViewContainer } from './baseViewContainer';
import { LeftForm } from './leftForm';
import { RightForm } from './rightForm';

export const BaseView: React.FC = () => {
  const { t } = useTranslation();
  const { fetchCurrentUser } = useAuth();
  const currentUser = useSelector(selectCurrentUser);
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (currentUser == null) {
    return <ProSkeleton />;
  }

  return (
    <BaseViewContainer>
      <LeftForm>
        <ProForm
          layout="vertical"
          submitter={{
            searchConfig: {
              submitText: t(buttonMessages.submit()),
            },
            render: (_, dom) => dom[1],
          }}
          initialValues={{
            ...currentUser,
            phone: currentUser?.mobile?.split('-'),
          }}
          hideRequiredMark
        >
          <ProFormText
            width="md"
            name="email"
            label={t(formMessages.title('email'))}
            rules={[
              {
                required: true,
                message: t(formMessages.require('email')) ?? '',
              },
            ]}
          />
          <ProFormText
            width="md"
            name="fullname"
            label={t(formMessages.title('fullname'))}
            rules={[
              {
                required: true,
                message: t(formMessages.require('fullname')) ?? '',
              },
            ]}
          />
          <ProFormSelect
            width="sm"
            name="country"
            label={t(formMessages.title('country'))}
            rules={[
              {
                required: true,
                message: t(formMessages.require('country')) ?? '',
              },
            ]}
            options={[
              {
                label: '中国',
                value: 'China',
              },
            ]}
          />

          <ProForm.Group title="所在省市" size={8}>
            <ProFormSelect
              rules={[
                {
                  required: true,
                  message: '请输入您的所在省!',
                },
              ]}
              width="sm"
              fieldProps={{
                labelInValue: true,
              }}
              name="province"
              //   className={styles.item}
              //   request={async () => {
              // return queryProvince().then(({ data }) => {
              //   return data.map(item => {
              //     return {
              //       label: item.name,
              //       value: item.id,
              //     };
              //   });
              // });
              //   }}
            />
            <ProFormDependency name={['province']}>
              {({ province }) => {
                return (
                  <ProFormSelect
                    params={{
                      key: province?.value,
                    }}
                    name="city"
                    width="sm"
                    rules={[
                      {
                        required: true,
                        message: '请输入您的所在城市!',
                      },
                    ]}
                    disabled={!province}
                    // className={styles.item}
                    // request={async () => {
                    //   if (!province?.key) {
                    //     return [];
                    //   }
                    //   return queryCity(province.key || '').then(({ data }) => {
                    //     return data.map(item => {
                    //       return {
                    //         label: item.name,
                    //         value: item.id,
                    //       };
                    //     });
                    //   });
                    // }}
                  />
                );
              }}
            </ProFormDependency>
          </ProForm.Group>
          <ProFormText
            width="md"
            name="address"
            label="街道地址"
            rules={[
              {
                required: true,
                message: '请输入您的街道地址!',
              },
            ]}
          />
          <ProFormFieldSet
            name="phone"
            label="联系电话"
            rules={[
              {
                required: true,
                message: '请输入您的联系电话!',
              },
              //   { validator: validatorPhone },
            ]}
          >
            {/* <Input className={styles.area_code} />
            <Input className={styles.phone_number} /> */}
          </ProFormFieldSet>
        </ProForm>
      </LeftForm>
      <RightForm>{/* <AvatarView avatar={getAvatarURL()} /> */}</RightForm>
    </BaseViewContainer>
  );
};
