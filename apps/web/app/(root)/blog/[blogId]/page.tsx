import { axiosInstance } from '@/utils/axiosInstance';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ blogId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { blogId } = await params;
    const res = await axiosInstance.get(`/posts/${blogId}`);
    const post = await res.data;

    const title = post?.title || 'Blog Post';

    return {
      title: `${title} - Community Nexus`,
      description: post?.content?.substring(0, 160) || 'Blog post details',
    };
  } catch (error) {
    return {
      title: 'Blog Post - Community Nexus',
      description: 'Blog post details',
    };
  }
}

export { BlogDetailPage as default } from '@/components/blog/BlogDetailPage';
