import dynamic from 'next/dynamic';

export default dynamic(() =>
  import('@/components/blog/BlogPage').then((mod) => mod.BlogPage),
);
