import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Community Nexus',
  description: 'Explore community blog posts',
};

export { BlogPage as default } from '@/components/blog/BlogPage';
