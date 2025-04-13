import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Blog - Community Nexus',
  description: 'Posts from our community members',
};

export { OurBlogPage as default } from '@/components/our-blog/OurBlogPage';
