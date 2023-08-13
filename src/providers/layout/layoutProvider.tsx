import React, { useContext } from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { useThemeSlice } from 'providers/layout/slice';
import { selectTheme, selectThemeKey } from 'providers/layout/slice/selectors';
import { ProConfigProvider, ProProvider } from '@ant-design/pro-provider';
import { intlMap } from '@ant-design/pro-components';
import { useTranslation } from 'react-i18next';

export const LayoutProvider = (props: { children: React.ReactChild }) => {
  useThemeSlice();
  const theme = useSelector(selectTheme);
  const themeKey = useSelector(selectThemeKey);
  const { i18n } = useTranslation();

  const isDark = React.useMemo(() => {
    if (themeKey === 'light') {
      return false;
    }
    if (themeKey === 'dark') {
      return true;
    }
    return false;
  }, [themeKey]);
  var context = useContext(ProProvider);
  context.intl = intlMap[i18n.language];
  return (
    <OriginalThemeProvider theme={theme}>
      <ProConfigProvider dark={isDark} hashed={true}>
        {React.Children.only(props.children)}
      </ProConfigProvider>
    </OriginalThemeProvider>
  );
};
