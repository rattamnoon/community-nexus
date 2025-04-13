import { ConfigProvider } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider';
import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const colors = {
  primary: '#49A569',
  secondary: '#243831',
  tertiary: '#FFFFFF',
  background: '#BBC2C0',
  text: '#101828',
};

export const themeConfig: ThemeConfig = {
  components: {
    Menu: {
      itemSelectedBg: colors.tertiary,
    },
    Button: {
      primaryShadow: '0px',
    },
    Select: {
      optionSelectedBg: colors.tertiary,
    },
    Calendar: {
      borderRadiusSM: 15,
    },
    Dropdown: {
      colorBgElevated: colors.tertiary,
      controlItemBgHover: '#D8E9E4',
      padding: 0,
      paddingXS: 0,
      paddingXXS: 0,
      borderRadiusLG: 8,
      borderRadiusSM: 0,
      borderRadiusXS: 0,
    },
    Layout: {
      headerBg: colors.background,
      bodyBg: colors.background,
      footerBg: colors.background,
    },
    Modal: {
      headerBg: colors.tertiary,
      contentBg: colors.tertiary,
      footerBg: colors.tertiary,
    },
  },
  token: {
    colorPrimary: colors.primary,
    colorLink: colors.primary,
    colorTextSecondary: '#939494',
    fontFamily: inter.style.fontFamily,
  },
};

const withTheme = (node: JSX.Element) => (
  <ConfigProvider theme={themeConfig}>{node}</ConfigProvider>
);

export default withTheme;
