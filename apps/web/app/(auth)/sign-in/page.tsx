import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Sign In - Community Nexus',
  description: 'Sign in to your Community Nexus account',
};

export default dynamic(() =>
  import('@/components/auth/SignInPage').then((mod) => mod.SignInPage),
);
