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
import { CacheKey, LocalStorageUtil } from 'utils/localStorageUtil';

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
    LocalStorageUtil.set(CacheKey.Theme, value);
    dispatch(layoutActions.changeTheme(value));
    setThemeSelected(value);
  };

  const themeConfigs = [
    {
      key: 'system',
      style: menuItemStyle ?? { minWidth: '160px' },
      label: t(messages.systemTheme()),
    },
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
    if (themeSelected === 'system') {
      return (
        <i className="anticon" title={themeSelected}>
          <svg width="18" height="18" viewBox="0 0 580.5 580.5">
            <path d="m350 434.67c41.023 0 80.363-16.297 109.37-45.301 29.004-29.008 45.301-68.348 45.301-109.37s-16.297-80.363-45.301-109.37c-29.008-29.004-68.348-45.301-109.37-45.301s-80.363 16.297-109.37 45.301c-29.004 29.008-45.301 68.348-45.301 109.37-0.015625 41.027 16.277 80.375 45.285 109.39 29.012 29.008 68.359 45.301 109.39 45.285zm0-289.07c35.645 0 69.832 14.16 95.035 39.363s39.363 59.391 39.363 95.035-14.16 69.832-39.363 95.035-59.391 39.363-95.035 39.363-69.832-14.16-95.035-39.363-39.363-59.391-39.363-95.035 14.16-69.832 39.363-95.035 59.391-39.363 95.035-39.363zm109.87 137.31c0.015625-28.762-11.398-56.352-31.734-76.695-20.332-20.344-47.918-31.773-76.68-31.773v216.89c28.754 0 56.328-11.422 76.66-31.754 20.332-20.332 31.754-47.91 31.754-76.664zm-111.33 173.6c-5.5977 0-10.137 4.5391-10.137 10.137v69.215c0 5.5977 4.5391 10.137 10.137 10.137 5.5977 0 10.137-4.5391 10.137-10.137v-69.383c0-2.6875-1.0664-5.2656-2.9688-7.168-1.9023-1.9023-4.4805-2.9688-7.168-2.9688zm139.44-50.398c-3.9883-2.8047-9.4023-2.3711-12.895 1.0234-3.4922 3.3984-4.0742 8.8008-1.3867 12.863l49.055 49.055h0.003907c4.0195 3.5469 10.102 3.3477 13.883-0.44922s3.957-9.8789 0.39453-13.887zm38.359-124.27c0 5.5977 4.5391 10.137 10.137 10.137h69.383c5.5977 0 10.137-4.5391 10.137-10.137s-4.5391-10.137-10.137-10.137h-69.383c-5.4492-0.003907-9.9258 4.3008-10.137 9.7461zm-36.344-125.55 49.055-49.055v-0.003907c3.5469-4.0195 3.3477-10.102-0.44922-13.883s-9.8789-3.957-13.887-0.39453l-49.055 49.055c-3.543 4.0195-3.3477 10.105 0.44922 13.887s9.8828 3.9531 13.887 0.39453zm-138.6-52.641c5.5977 0 10.137-4.5391 10.137-10.137v-69.383c0-5.5977-4.5391-10.137-10.137-10.137-5.5977 0-10.133 4.5391-10.133 10.137v69.383c0 2.6992 1.0742 5.2852 2.9883 7.1875 1.9102 1.9023 4.5039 2.9648 7.2031 2.9492zm-139.44 50.398h0.003907c4.0039 3.0859 9.6719 2.75 13.281-0.78906 3.6094-3.5391 4.0586-9.1992 1.0547-13.266l-49.055-49.055h-0.003907c-1.8555-2.0898-4.4922-3.3203-7.2852-3.3984-2.7969-0.082031-5.4961 0.99609-7.4688 2.9766-1.9727 1.9805-3.043 4.6875-2.9492 7.4805 0.089844 2.7969 1.3281 5.4258 3.4258 7.2773zm-117.6 134.4 69.164 0.003906c5.5977 0 10.137-4.5391 10.137-10.137 0-5.5977-4.5391-10.137-10.137-10.137h-69.383c-5.5977 0-10.137 4.5391-10.137 10.137 0 5.5977 4.5391 10.137 10.137 10.137zm123.2 112 0.003906 0.003906c-2.6914-0.019531-5.2773 1.0508-7.168 2.9688l-49.055 49.055c-1.9141 1.8945-2.9922 4.4727-2.9922 7.168 0 2.6914 1.0781 5.2734 2.9922 7.168 3.9727 3.9297 10.363 3.9297 14.336 0l49.055-49.113c2.8594-2.9023 3.7031-7.2383 2.1406-11-1.5664-3.7656-5.2305-6.2266-9.3086-6.2461z" />
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
