import React from 'react';
import { ProForm } from '@ant-design/pro-components';
import { GroupProps } from '@ant-design/pro-form/es/typing';
import { formMessages } from 'app/messages';
import { useTranslation } from 'react-i18next';
import { NamePath } from 'antd/es/form/interface';

interface FormGroupProps extends GroupProps {
  name: NamePath;
  bold?: boolean;
  children?: React.ReactNode;
}
export const FormGroup = (props: FormGroupProps) => {
  const { t } = useTranslation();
  return (
    <ProForm.Group
      title={t(formMessages.title(props.name.toString()))}
      titleStyle={{
        fontWeight: props.bold ? 'bold' : 'normal',
      }}
      {...props}
    >
      {props.children}
    </ProForm.Group>
  );
};
