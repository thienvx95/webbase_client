import * as React from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { useThemeSlice } from 'providers/theme/slice';
import { selectTheme, selectThemeKey } from 'providers/theme/slice/selectors';
import { isSystemDark } from 'providers/theme/utils';
import { ProConfigProvider } from '@ant-design/pro-provider';

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  useThemeSlice();
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
  return (
    <OriginalThemeProvider theme={theme}>
      <ProConfigProvider dark={isDark}>
        {React.Children.only(props.children)}
      </ProConfigProvider>
    </OriginalThemeProvider>
  );
};
