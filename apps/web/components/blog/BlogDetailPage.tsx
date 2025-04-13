'use client';

import { Menus } from '@/components/Menus';
import { axiosInstance } from '@/utils/axiosInstance';
import { Post } from '@repo/api/posts/entities/post.entity';
import { useQuery } from '@tanstack/react-query';
import { Col, Flex, Row, Skeleton } from 'antd';
import { useParams } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';
import { PostDetail } from '../posts/PostDetail';

const fetchPosts = async (blogId: number): Promise<Post> => {
  const res = await axiosInstance.get(`/posts/${blogId}`);
  const data = await res.data;
  return data as Post;
};

export const BlogDetailPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 992px)');
  const { blogId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['posts', blogId],
    queryFn: () => fetchPosts(blogId as unknown as number),
  });

  return (
    <Row gutter={[16, 16]} justify="space-between">
      {isMobile || isTablet ? null : (
        <Col lg={4} md={6} xs={24}>
          <Menus />
        </Col>
      )}
      <Col lg={20} md={18} xs={24}>
        <Flex
          vertical
          style={{
            backgroundColor: '#FFFFFF',
            minHeight: 'calc(100vh - 48px)',
          }}
        >
          <Skeleton active loading={isLoading}>
            <PostDetail post={data as Post} />
          </Skeleton>
        </Flex>
      </Col>
    </Row>
  );
};
