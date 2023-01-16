import { ProFormText } from '@ant-design/pro-components';
import { NamePath } from 'antd/es/form/interface';
import { formMessages } from 'app/messages';
import { Rule } from 'rc-field-form/lib/interface';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export interface TitleLabelType {
  bold?: boolean;
}
export const TitleLabel = styled.span<TitleLabelType>`
  font-weight: ${x => (x.bold ? 'bold' : '100')};
`;

interface FormTextProps {
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  name: NamePath;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  hideLabel?: boolean;
  hidePlaceholder?: boolean;
  email?: boolean;
  bold?: boolean;
}
export const FormText = (props: FormTextProps) => {
  const { t } = useTranslation();
  const rules: Rule[] = [];
  if (props.required) {
    rules.push({
      required: true,
      message: t(formMessages.require(props.name.toString())) ?? '',
    });
  }

  if (props.email) {
    rules.push({
      type: 'email',
      message: t(formMessages.invalid(props.name.toString())) ?? '',
    });
  }

  const nameMessages = useMemo(() => {
    if (typeof props.name === 'string') {
      return props.name as string;
    }
    if (typeof props.name === 'object' && props.name.length) {
      return props.name.at(-1) as string;
    }
    return '';
  }, [props.name]);

  return (
    <ProFormText
      width={props.width}
      name={props.name}
      placeholder={
        props.hidePlaceholder ? '' : t(formMessages.title(nameMessages)) ?? ''
      }
      label={
        props.hideLabel ? (
          ''
        ) : (
          <TitleLabel bold={props.bold}>
            {t(formMessages.title(nameMessages))}
          </TitleLabel>
        )
      }
      rules={rules}
      disabled={props.disabled}
      fieldProps={{
        maxLength: props.maxLength,
      }}
    />
  );
};
