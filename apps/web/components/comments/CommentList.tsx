import { axiosInstance } from '@/utils/axiosInstance';
import { Comment } from '@repo/api/comments/entities/comment.entity';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Flex, Skeleton, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Text, Paragraph } = Typography;

const fetchComments = async (postId: number) => {
  const res = await axiosInstance.get(`/comments?postId=${postId}`);
  return res.data as Comment[];
};

export const CommentList = ({ postId }: { postId: number }) => {
  const mainUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  return (
    <Skeleton active loading={isLoading}>
      {comments?.map((comment) => (
        <Flex key={comment.id} align="top" gap={16}>
          <Flex align="start" justify="center">
            <Avatar src={`${mainUrl}/users/${comment.user.id}/avatar`} />
          </Flex>
          <Flex vertical gap={8} flex={1}>
            <Space>
              <Text style={{ color: '#191919' }}>{comment.user.username}</Text>
              <Text type="secondary">{dayjs(comment.createdAt).fromNow()}</Text>
            </Space>
            <Paragraph style={{ color: '#191919', fontSize: 12 }}>
              {comment.content}
            </Paragraph>
          </Flex>
        </Flex>
      ))}
    </Skeleton>
  );
};
