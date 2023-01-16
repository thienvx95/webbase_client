import React from 'react';
import { ThemeProvider as OriginalThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';
import { useThemeSlice } from 'providers/layout/slice';
import { selectTheme, selectThemeKey } from 'providers/layout/slice/selectors';
import { ProConfigProvider } from '@ant-design/pro-provider';

export const LayoutProvider = (props: { children: React.ReactChild }) => {
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
    return false;
  }, [themeKey]);

  return (
    <OriginalThemeProvider theme={theme}>
      <ProConfigProvider dark={isDark} hashed={true}>
        {React.Children.only(props.children)}
      </ProConfigProvider>
    </OriginalThemeProvider>
  );
};
