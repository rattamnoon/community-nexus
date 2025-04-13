import { AddComment } from '@/components/comments/AddComment';
import { CommentList } from '@/components/comments/CommentList';
import { MessageIcon } from '@/icons/Message.icon';
import { colors } from '@/theme';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Post } from '@repo/api/posts/entities/post.entity';
import { Avatar, Button, Flex, Skeleton, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';

dayjs.extend(relativeTime);

const { Title, Text, Paragraph } = Typography;

export const PostDetail = ({
  post,
  isLoading,
}: {
  post: Post;
  isLoading: boolean;
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 992px)');
  const router = useRouter();
  const mainUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <Flex
      vertical
      gap={40}
      style={{
        paddingLeft: isMobile || isTablet ? 20 : 80,
        paddingRight: isMobile || isTablet ? 20 : 80,
        paddingTop: isMobile || isTablet ? 20 : 40,
      }}
    >
      <Button
        variant="filled"
        color="primary"
        shape="circle"
        icon={<ArrowLeftOutlined style={{ color: colors.text }} />}
        onClick={() => router.back()}
      />

      {isLoading ? (
        <Skeleton active />
      ) : (
        <Flex vertical gap={24}>
          <Flex vertical gap={16}>
            <Space>
              <Avatar src={`${mainUrl}/users/${post.user.id}/avatar`} />
              <Text style={{ color: '#191919' }}>{post.user.username}</Text>
              <Text type="secondary">{dayjs(post.createdAt).fromNow()}</Text>
            </Space>
            <Flex gap={4}>
              <Tag key={post.tag} color="#F3F3F3" style={{ color: '#4A4A4A' }}>
                {post.tag}
              </Tag>
            </Flex>
            <Flex vertical>
              <Title level={2} style={{ color: colors.text }}>
                {post.title}
              </Title>
              <Paragraph style={{ color: colors.text, fontSize: 12 }}>
                {post.content}
              </Paragraph>
            </Flex>
            <Flex justify="space-between">
              <Flex align="center" gap={4}>
                <MessageIcon />
                <Text type="secondary">{post.commentCount} Comments</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex vertical gap={16}>
            <Flex>
              <AddComment postId={post.id} />
            </Flex>
            <CommentList postId={post.id} />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
