import * as React from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { useThemeSlice } from 'styles/theme/slice';
import { selectTheme, selectThemeKey } from 'styles/theme/slice/selectors';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { isSystemDark } from 'styles/theme/utils';
import { useStyle, ProConfigProvider } from '@ant-design/pro-provider';

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  useThemeSlice();
  useStyle('ProLayoutFooter', token => {
    console.log(token);
    return null;
  });
  const theme = useSelector(selectTheme);
  const themeKey = useSelector(selectThemeKey);

  const isDark = React.useMemo(() => {
    if (themeKey === 'light') {
      return false;
    }
    if (themeKey === 'dark') {
      return true;
    }
    if (themeKey === 'system') {
      return isSystemDark;
    }
  }, [themeKey]);
  console.log('🚀 ~ file: themeProvider.tsx:30 ~ isDark ~ isDark', isDark);
  return (
    <OriginalThemeProvider theme={theme}>
      <ProConfigProvider dark={isDark}>
        {React.Children.only(props.children)}
      </ProConfigProvider>
    </OriginalThemeProvider>
  );
};
