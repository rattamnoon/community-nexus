import dynamic from 'next/dynamic';

export default dynamic(() =>
  import('@/components/auth/SignInPage').then((mod) => mod.SignInPage),
);
