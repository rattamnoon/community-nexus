import { AuthLayout } from '@/components/auth/AuthLayout';
import withTheme from '@/theme';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return withTheme(<AuthLayout>{children}</AuthLayout>);
};

export default RootLayout;
