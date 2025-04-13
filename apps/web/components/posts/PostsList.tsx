import { Routes } from '@/constant/routes';
import { EditIcon } from '@/icons/Edit.icon';
import { MessageIcon } from '@/icons/Message.icon';
import { TrashIcon } from '@/icons/Trash.icon';
import { colors } from '@/theme';
import { Post } from '@repo/api/posts/entities/post.entity';
import { Avatar, Button, Flex, Space, Tag, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const { Title, Text, Paragraph } = Typography;

interface CardProps {
  post: Post;
  isLiked: boolean;
  onLike: (postId: number) => void;
  onUnlike: (postId: number) => void;
  firstIndex: boolean;
  lastIndex: boolean;
  isOurPost?: boolean;
  onPostDelete?: (postId: number) => void;
  onEditPost?: (post: Post) => void;
}

const Card = ({
  post,
  onLike,
  onUnlike,
  firstIndex,
  lastIndex,
  isOurPost,
  onPostDelete,
  onEditPost,
}: CardProps) => {
  const router = useRouter();
  const mainUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <Flex
      vertical
      gap={15}
      style={{
        padding: 20,
        border: `1px solid ${colors.tertiary}`,
        backgroundColor: colors.tertiary,
        cursor: isOurPost ? 'default' : 'pointer',
        borderRadius: firstIndex
          ? '12px 12px 0 0'
          : lastIndex
            ? '0 0 12px 12px'
            : '0',
      }}
      onClick={() => {
        if (isOurPost) return;
        router.push(Routes.BlogDetail(post.id));
      }}
    >
      <Flex justify="space-between">
        <Space>
          <Avatar src={`${mainUrl}/users/${post.user.id}/avatar`} />
          <Text strong type="secondary">
            {post.user.username}
          </Text>
        </Space>
        {isOurPost && (
          <Space>
            <Button
              variant="link"
              color="primary"
              icon={<EditIcon />}
              onClick={() => onEditPost?.(post)}
            />
            <Button
              variant="link"
              color="primary"
              icon={<TrashIcon />}
              onClick={() => onPostDelete?.(post.id)}
            />
          </Space>
        )}
      </Flex>
      <Flex gap={4}>
        <Tag key={post.tag} color="#F3F3F3" style={{ color: '#4A4A4A' }}>
          {post.tag}
        </Tag>
      </Flex>
      <Flex vertical>
        <Title level={5} style={{ color: colors.text, fontSize: 16 }}>
          {post.title}
        </Title>
        <Paragraph
          ellipsis={{ rows: 2, tooltip: false }}
          style={{ color: colors.text, fontSize: 12 }}
        >
          {post.content}
        </Paragraph>
        <Flex justify="space-between">
          <Flex align="center" gap={4}>
            <MessageIcon />
            <Text type="secondary">{post.commentCount} Comments</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const PostsList = ({
  posts,
  isOurPost,
  onPostDelete,
  onEditPost,
}: {
  posts: Post[];
  isOurPost?: boolean;
  onPostDelete?: (postId: number) => void;
  onEditPost?: (post: Post) => void;
}) => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const onLike = (postId: number) => {
    setLikedPosts([...likedPosts, postId]);
  };

  const onUnlike = (postId: number) => {
    setLikedPosts(likedPosts.filter((id) => id !== postId));
  };

  return (
    <Flex vertical gap={1}>
      {posts.map((post, index) => (
        <Card
          key={post.id}
          post={post}
          isLiked={likedPosts.includes(post.id)}
          onLike={() => onLike(post.id)}
          onUnlike={() => onUnlike(post.id)}
          firstIndex={index === 0}
          lastIndex={index === posts.length - 1}
          isOurPost={isOurPost}
          onPostDelete={onPostDelete}
          onEditPost={onEditPost}
        />
      ))}
    </Flex>
  );
};
