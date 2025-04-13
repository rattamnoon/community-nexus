import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - Community Nexus',
  description: 'Manage your profile and settings',
};

export { ProfilePage as default } from '@/components/profile/ProfilePage';
