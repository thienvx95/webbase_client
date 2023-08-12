import * as React from 'react';
import { layoutActions } from 'providers/layout/slice';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeKeyType } from 'providers/layout/slice/types';
import { selectThemeKey } from 'providers/layout/slice/selectors';
import { HeaderDropdown } from '../HeaderDropdown';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { useMemo } from 'react';
import { CacheKey, StorageUtil } from 'utils/storageUtil';

interface ThemeSwitchProps {
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
  onItemClick?: (params: MenuInfo) => void;
  className?: string;
  reload?: boolean;
  icon?: React.ReactNode;
}

export const ThemeSwitch: React.FC<ThemeSwitchProps> = ({
  globalIconClassName,
  onItemClick,
  menuItemStyle,
  menuItemIconStyle,
  placement,
  icon,
  reload,
  ...restProps
}) => {
  const { t } = useTranslation();
  const theme = useSelector(selectThemeKey);
  const [themeSelected, setThemeSelected] = React.useState(theme);
  const dispatch = useDispatch();

  const changeTheme = ({ key }: MenuInfo): void => {
    const value = key as ThemeKeyType;
    StorageUtil.set(CacheKey.Theme, value);
    dispatch(layoutActions.changeTheme(value));
    setThemeSelected(value);
  };

  const themeConfigs = [
    {
      key: 'light',
      style: menuItemStyle ?? { minWidth: '160px' },
      label: t(messages.light()),
    },
    {
      key: 'dark',
      style: menuItemStyle ?? { minWidth: '160px' },
      label: t(messages.dark()),
    },
  ];

  const themeMenu = {
    selectedKeys: [theme],
    onClick: changeTheme,
    items: themeConfigs,
  };

  const getThemeIcon = useMemo(() => {
    if (themeSelected === 'dark') {
      return (
        <i className="anticon" title={themeSelected}>
          <svg width="18" height="18" viewBox="0 0 98.2 98.2">
            <path
              d="M 89.634 59.683 c -0.338 -0.276 -0.816 -0.302 -1.184 -0.062 c -16.514 10.864 -38.661 8.589 -52.661 -5.41 C 21.79 40.212 19.515 18.065 30.38 1.551 c 0.24 -0.366 0.215 -0.845 -0.062 -1.183 c -0.277 -0.339 -0.741 -0.46 -1.148 -0.294 c -5.826 2.349 -11.048 5.809 -15.523 10.283 c -18.195 18.195 -18.195 47.802 0 65.997 C 22.744 85.451 34.695 90 46.645 90 c 11.951 0 23.901 -4.549 32.999 -13.646 c 4.475 -4.476 7.935 -9.699 10.284 -15.523 C 90.091 60.425 89.972 59.96 89.634 59.683 z"
              className="css-c4d79v"
            />
          </svg>
        </i>
      );
    }
    if (themeSelected === 'light') {
      return (
        <i className="anticon" title={themeSelected}>
          <svg width="18" height="18" viewBox="0 0 98.2 98.2">
            <path
              d="M 46.792 90 c -3.908 0 -7.841 -0.514 -11.717 -1.552 c -11.607 -3.11 -21.309 -10.555 -27.317 -20.961 s -7.604 -22.53 -4.494 -34.137 c 3.11 -11.607 10.554 -21.309 20.961 -27.317 C 32.827 1.066 42.58 -0.89 52.417 0.374 c 0.419 0.054 0.76 0.365 0.849 0.777 c 0.091 0.412 -0.088 0.837 -0.445 1.062 c -15.589 9.766 -20.593 29.899 -11.392 45.835 l 0 0 C 50.63 63.985 70.57 69.716 86.819 61.099 c 0.372 -0.196 0.83 -0.141 1.142 0.145 c 0.312 0.284 0.412 0.734 0.249 1.124 c -3.827 9.156 -10.396 16.619 -18.998 21.586 C 62.281 87.956 54.588 90 46.792 90 z M 46.609 2 c -7.486 0 -14.787 1.956 -21.384 5.765 C 15.281 13.506 8.168 22.776 5.196 33.867 S 3.749 56.543 9.49 66.487 c 5.741 9.945 15.011 17.058 26.102 20.03 c 11.092 2.971 22.676 1.448 32.62 -4.295 c 7.426 -4.287 13.267 -10.523 17.022 -18.139 c -16.701 7.295 -36.267 1.021 -45.538 -15.036 s -4.921 -36.139 9.747 -46.954 C 48.497 2.03 47.551 2 46.609 2 z"
              className="css-c4d79v"
            />
          </svg>
        </i>
      );
    }
  }, [themeSelected]);

  return (
    <HeaderDropdown
      menu={themeMenu}
      title={themeSelected}
      placement={placement ?? 'bottomRight'}
      {...restProps}
      icon={getThemeIcon}
    />
  );
};
