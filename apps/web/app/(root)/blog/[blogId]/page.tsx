import { axiosInstance } from '@/utils/axiosInstance';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { blogId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // Fetch blog post data
  try {
    const res = await axiosInstance.get(`/posts/${params.blogId}`);
    const post = await res.data;

    // Fallback values if the API call fails
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
