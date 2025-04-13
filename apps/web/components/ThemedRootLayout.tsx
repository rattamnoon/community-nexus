import withTheme from '@/theme';
import { Layout } from 'antd';
import { TopNavBar } from './TopNavBar';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout className="min-h-screen" style={{ minHeight: '100vh' }}>
      <TopNavBar />
      {children}
    </Layout>
  );
};

const ThemedRootLayout = ({ children }: { children: React.ReactNode }) => {
  return withTheme(<RootLayout>{children}</RootLayout>);
};

export default ThemedRootLayout;
