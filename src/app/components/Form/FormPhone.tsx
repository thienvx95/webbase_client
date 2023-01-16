import React from 'react';
import { ProFormFieldSet } from '@ant-design/pro-components';
import { formMessages } from 'app/messages';
import { useTranslation } from 'react-i18next';
import { TitleLabel } from './FormText';
import { Rule } from 'antd/es/form';
import { Input } from 'antd';
import styled from 'styled-components';
import { NamePath } from 'antd/es/form/interface';

interface FormPhoneProps {
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  name: NamePath;
  required?: boolean;
  hideLabel?: boolean;
  bold?: boolean;
}

const AreaCodeInput = styled(Input)`
  width: 72px;
`;

const PhoneNumberInput = styled(Input)`
  width: 214px;
`;

export const FormPhone = (props: FormPhoneProps) => {
  const { t } = useTranslation();
  const validatorPhone = (
    rule: any,
    value: string[],
    callback: (message?: string) => void,
  ) => {
    if (!value) {
      callback();
      return;
    }
    if (!value[0] || !value[1]) {
      if (!value[0]) {
        callback(t(formMessages.require('phonecode')) ?? '');
      }
      if (!value[1]) {
        callback(t(formMessages.require('phonenumber')) ?? '');
      }
    }
    callback();
  };

  const rules: Rule[] = [{ validator: validatorPhone }];
  if (props.required) {
    rules.push({
      required: true,
      message: t(formMessages.require('mobile')) ?? '',
    });
  }

  return (
    <ProFormFieldSet
      name={props.name}
      label={
        props.hideLabel ? (
          ''
        ) : (
          <TitleLabel bold={props.bold}>
            {t(formMessages.title('mobile'))}
          </TitleLabel>
        )
      }
      rules={rules}
    >
      <AreaCodeInput placeholder="+(84)" maxLength={3} />
      <PhoneNumberInput placeholder="1234568789" maxLength={9} />
    </ProFormFieldSet>
  );
};
