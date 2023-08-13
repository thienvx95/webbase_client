import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { HeaderDropdown } from '../HeaderDropdown';
import { MenuInfo } from 'rc-menu/lib/interface';
import { messages } from './messages';

interface LocalData {
  lang: string;
  label?: string;
  icon?: string;
}

interface LanguageSwitchProps {
  globalIconClassName?: string;
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter';
  menuItemStyle?: object;
  menuItemIconStyle?: object;
  postLocalesData?: LocalData[];
  onItemClick?: (params: MenuInfo) => void;
  className?: string;
  reload?: boolean;
  icon?: React.ReactNode;
}

export const defaultLang: Array<LocalData> = [
  {
    lang: 'en-GB',
    icon: '🇬🇧',
  },
  {
    lang: 'vi-VN',
    icon: 'vn',
  },
];

export const LanguageSwitch: React.FC<LanguageSwitchProps> = ({
  globalIconClassName,
  postLocalesData,
  onItemClick,
  menuItemStyle,
  menuItemIconStyle,
  placement,
  icon,
  reload,
  ...restProps
}) => {
  const { t, i18n } = useTranslation();
  const changeLang = ({ key }: MenuInfo): void => {
    i18n.changeLanguage(key);
    window.location.reload();
  };
  const allLangUIConfig = postLocalesData ?? defaultLang;

  const langMenu = {
    selectedKeys: [i18n.language ?? ''],
    onClick: changeLang,
    items: allLangUIConfig?.map(localeObj => ({
      key: localeObj?.lang,
      style: menuItemStyle ?? { minWidth: '160px' },
      label: (
        <>
          <span
            role="img"
            aria-label={localeObj?.label || 'en'}
            style={menuItemIconStyle ?? { marginRight: '8px' }}
          >
            {localeObj?.icon || '🌐'}
          </span>
          {t(messages[localeObj?.lang]())}
        </>
      ),
    })),
  };

  return (
    <HeaderDropdown
      menu={langMenu}
      placement={placement ?? 'bottomRight'}
      {...restProps}
    />
  );
};
