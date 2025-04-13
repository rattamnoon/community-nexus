'use client';

import { Menus } from '@/components/Menus';
import { Routes } from '@/constant/routes';
import { useAxios } from '@/hooks/useAxios';
import { UpdatePostDto } from '@repo/api/posts/dto/update-post.dto';
import { Post } from '@repo/api/posts/entities/post.entity';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Col, Flex, message, Modal, Row, Skeleton } from 'antd';
import { AxiosInstance } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { SearchBar } from '../common/SearchBar';
import { PostDeleteDialog } from '../posts/PostDeleteDialog';
import { PostDialog } from '../posts/PostDialog';
import { PostsList } from '../posts/PostsList';

const fetchPosts = async (
  instance: AxiosInstance,
  tag: string,
  searchText: string,
): Promise<Post[]> => {
  const res = await instance.get('/posts/our-posts', {
    params: { tag, searchText },
  });
  const data = ((await res.data) || []) as Post[];
  return data;
};

const updatePostFn = async (
  instance: AxiosInstance,
  data: UpdatePostDto,
  postId: number,
) => {
  const res = await instance.patch(`/posts/${postId}`, data);
  const response = await res.data;
  return response;
};

export const OurBlogPage = () => {
  const router = useRouter();
  const [modalApi, modalContextHolder] = Modal.useModal();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 992px)');
  const searchParams = useSearchParams();
  const tag = searchParams.get('tag') || '';
  const searchText = searchParams.get('searchText') || '';
  const { instance } = useAxios();
  const [openPostDeleteDialog, setOpenPostDeleteDialog] = useState(false);
  const [postId, setPostId] = useState<number>();
  const queryClient = useQueryClient();
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [post, setPost] = useState<Post>();
  const [postTitle, setPostTitle] = useState<string>('');
  const { status } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: ['posts', tag, searchText, 'our-blog'],
    queryFn: () => fetchPosts(instance, tag, searchText),
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: (postId: number) => {
      return instance.delete(`/posts/${postId}`);
    },
    onSuccess: () => {
      setOpenPostDeleteDialog(false);
      setPostId(undefined);
      queryClient.invalidateQueries({
        queryKey: ['posts', tag, searchText, 'our-blog'],
      });
    },
  });

  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    mutationKey: ['updatePost'],
    mutationFn: (values: UpdatePostDto) => {
      return updatePostFn(instance, values, post?.id || 0);
    },
    onSuccess: () => {
      setPost(undefined);
      setOpenPostDialog(false);
      queryClient.invalidateQueries({
        queryKey: ['posts', tag, searchText, 'our-blog'],
      });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Failed to update post');
    },
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      modalApi.warning({
        title: 'You need to sign in to create a post',
        okText: 'Sign in',
        cancelText: 'Cancel',
        centered: true,
        onOk: () => {
          const callbackUrl = Routes.OurBlog;
          router.push(`${Routes.SignIn}?callbackUrl=${callbackUrl}`);
        },
      });
    }
  }, [status]);

  return (
    <>
      {modalContextHolder}
      <Row gutter={[16, 16]} justify="space-between">
        {isMobile || isTablet ? null : (
          <Col lg={4} md={6} xs={24}>
            <Menus />
          </Col>
        )}
        <Col lg={16} md={12} xs={24}>
          <Flex vertical gap={16} style={{ padding: 20 }}>
            <SearchBar
              isOurBlog
              onCreatePost={() => {
                setOpenPostDialog(true);
                setPostTitle('Create Post');
              }}
            />
            <Skeleton active loading={isLoading}>
              <PostsList
                posts={data || []}
                isOurPost
                onEditPost={(post) => {
                  setOpenPostDialog(true);
                  setPostTitle('Edit Post');
                  setPost(post);
                }}
                onPostDelete={(postId) => {
                  setOpenPostDeleteDialog(true);
                  setPostId(postId);
                }}
              />
            </Skeleton>
          </Flex>
        </Col>
        {isMobile || isTablet ? null : <Col lg={4} md={6} xs={24} />}
      </Row>
      <PostDeleteDialog
        open={openPostDeleteDialog}
        onCancel={() => {
          setOpenPostDeleteDialog(false);
        }}
        onDelete={() => {
          if (postId) deletePost(postId);
        }}
      />
      <PostDialog
        title={postTitle}
        open={openPostDialog}
        post={post}
        onSubmit={(values) => {
          updatePost(values);
        }}
        isPending={isUpdating}
        onCancel={() => {
          setOpenPostDialog(false);
        }}
      />
    </>
  );
};
