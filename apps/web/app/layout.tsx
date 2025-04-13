import { AntdRegistry } from '@ant-design/nextjs-registry';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import { inter } from '@/theme';
import { SessionWrapper } from '../components/SessionWrapper';
import { TanstackQueryWrapper } from '../components/TanstackQueryWrapper';
import './globals.css';

export const metadata: Metadata = {
  title: 'Community Nexus',
  description: 'Community Nexus is a community for the Nexus community',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <SessionWrapper>
            <TanstackQueryWrapper>{children}</TanstackQueryWrapper>
          </SessionWrapper>
        </AntdRegistry>
      </body>
    </html>
  );
}
