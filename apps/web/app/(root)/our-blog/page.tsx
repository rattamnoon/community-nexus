import dynamic from 'next/dynamic';

export default dynamic(() =>
  import('@/components/our-blog/OurBlogPage').then((mod) => mod.OurBlogPage),
);
