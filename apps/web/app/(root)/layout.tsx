import ThemedRootLayout from '@/components/ThemedRootLayout';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <ThemedRootLayout>{children}</ThemedRootLayout>;
};

export default RootLayout;
