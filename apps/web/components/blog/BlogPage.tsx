'use client';

import { Menus } from '@/components/Menus';
import { useAxios } from '@/hooks/useAxios';
import { axiosInstance } from '@/utils/axiosInstance';
import { CreatePostDto } from '@repo/api/posts/dto/create-post.dto';
import { Post } from '@repo/api/posts/entities/post.entity';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Col, Flex, message, Row, Skeleton } from 'antd';
import { AxiosInstance } from 'axios';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { SearchBar } from '../common/SearchBar';
import { PostDialog } from '../posts/PostDialog';
import { PostsList } from '../posts/PostsList';

const fetchPosts = async (tag: string, searchText: string): Promise<Post[]> => {
  const res = await axiosInstance.get('/posts', {
    params: { tag, searchText },
  });
  const data = ((await res.data) || []) as Post[];
  return data;
};

const createPostFn = async (instance: AxiosInstance, data: CreatePostDto) => {
  const res = await instance.post('/posts', data);
  const response = await res.data;
  return response;
};

const Blog = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 992px)');
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag') || '';
  const searchText = searchParams.get('searchText') || '';
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const { instance } = useAxios();
  const queryClient = useQueryClient();
  const [messageApi, messageContextHolder] = message.useMessage();
  const { data, isLoading } = useQuery({
    queryKey: ['posts', tag, searchText],
    queryFn: () => fetchPosts(tag, searchText),
  });

  const { mutate: createPost, isPending } = useMutation({
    mutationKey: ['createPost'],
    mutationFn: (createPostDto: CreatePostDto) => {
      return createPostFn(instance, createPostDto);
    },
    onSuccess: () => {
      setOpenPostDialog(false);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error: any) => {
      messageApi.error(
        error?.response?.data?.message || 'Failed to create post',
      );
    },
  });

  return (
    <>
      {messageContextHolder}
      <Row gutter={[16, 16]} justify="space-between">
        {isMobile || isTablet ? null : (
          <Col lg={4} md={6} xs={24}>
            <Menus />
          </Col>
        )}
        <Col lg={16} md={12} xs={24}>
          <Flex vertical gap={16} style={{ padding: 20 }}>
            <SearchBar onCreatePost={() => setOpenPostDialog(true)} />
            <Skeleton active loading={isLoading}>
              <PostsList posts={data || []} />
            </Skeleton>
          </Flex>
        </Col>
        {isMobile || isTablet ? null : <Col lg={4} md={6} xs={24} />}
      </Row>
      <PostDialog
        title="Create Post"
        open={openPostDialog}
        onSubmit={(values) => {
          createPost(values);
        }}
        isPending={isPending}
        onCancel={() => {
          setOpenPostDialog(false);
        }}
      />
    </>
  );
};

export const BlogPage = () => {
  return (
    <Suspense fallback={<Skeleton active />}>
      <Blog />
    </Suspense>
  );
};
