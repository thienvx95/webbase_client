const lightTheme = {
  primaryColor: 'rgba(215,113,88,1)',
  text: 'rgba(58,52,51,1)',
  textSecondary: 'rgba(58,52,51,0.7)',
  background: 'rgba(255,255,255,1)',
  backgroundVariant: 'rgba(251,249,249,1)',
  border: 'rgba(58,52,51,0.12)',
  borderLight: 'rgba(58,52,51,0.05)',
  borderRadius: '6px',
  colorBgTextHover: 'rgba(0, 0, 0, 0.06)',
  colorPrimary: '#1677ff',
  colorBgContainer: '#ffffff',
  menuBg: '#ffffff',
  borderWidthBase: '1px',
  borderStyleBase: 'solid',
  borderColorSplit: 'hsv(0, 0, 94%)',
  headingColor: 'fade(@#000000, 85%)',
  fontSizeBase: '14px',
};

const darkTheme: Theme = {
  primaryColor: 'rgba(220,120,95,1)',
  text: 'rgba(229, 224, 216, 0.85)',
  textSecondary: 'rgba(241,233,231,0.6)',
  background: 'rgb(36, 37, 37)',
  backgroundVariant: 'rgba(28,26,26,1)',
  border: 'rgba(241,233,231,0.15)',
  borderLight: 'rgba(241,233,231,0.05)',
  borderRadius: '6px',
  colorBgTextHover: 'rgba(255, 255, 255, 0.12)',
  colorPrimary: '#1677ff',
  colorBgContainer: '#ffffff',
  menuBg: '#141414;',
  borderWidthBase: '1px',
  borderStyleBase: 'solid',
  borderColorSplit: '#303030;',
  headingColor: 'fade(#ffffff, 85%)',
  fontSizeBase: '14px',
};

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
