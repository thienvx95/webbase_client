import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { defaultLang } from '.';
import { LanguageSwitchProps } from './LanguageSwitchProps';
import { Select } from 'antd';

export const LanguageDropdown: React.FC<LanguageSwitchProps> = ({
  postLocalesData,
}) => {
  const { t, i18n } = useTranslation();
  const onChange = (value: string): void => {
    i18n.changeLanguage(value);
    window.location.reload();
  };
  const allLangUIConfig = postLocalesData ?? defaultLang;
  var options = allLangUIConfig?.map(localeObj => ({
    value: localeObj.lang,
    label: t(messages[localeObj?.lang]()),
  }));

  return (
    <Select
      defaultValue={i18n.language}
      options={options}
      onChange={onChange}
    ></Select>
  );
};
