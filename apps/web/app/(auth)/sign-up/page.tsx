import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Community Nexus',
  description: 'Create a new account on Community Nexus',
};

export { SignUpPage as default } from '@/components/auth/SignUpPage';
