import { colors } from '@/theme';
import { axiosInstance } from '@/utils/axiosInstance';
import { CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import { CreatePostDto } from '@repo/api/posts/dto/create-post.dto';
import { Post } from '@repo/api/posts/entities/post.entity';
import { Tag } from '@repo/api/tags/entities/tag.entity';
import { useQuery } from '@tanstack/react-query';
import { Button, Dropdown, Flex, Form, Input, Modal, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { CustomFormItem } from '../common/CustomFormItem';

const { Title } = Typography;

interface PostDialogProps {
  title: string;
  open: boolean;
  onCancel: () => void;
  post?: Post;
  onSubmit: (values: { title: string; content: string; tag: string }) => void;
  isPending: boolean;
}

const fetchTags = async (): Promise<Tag[]> => {
  const res = await axiosInstance.get('/tags');
  const data = await res.data;
  return data;
};

export const PostDialog = ({
  title,
  open,
  onCancel,
  post,
  onSubmit,
  isPending,
}: PostDialogProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 992px)');
  const [form] = Form.useForm<CreatePostDto>();
  const [tagKey, setTagKey] = useState<string>('');

  const { data } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });

  const tags = useMemo(() => data || [], [data]);
  const tagOptions = useMemo(
    () =>
      tags.map((tag) => ({
        label: tag.name,
        key: tag.name,
        extra:
          tagKey === tag.name ? (
            <CheckOutlined style={{ color: '#4A4A4A' }} />
          ) : null,
      })),
    [tags, tagKey],
  );

  useEffect(() => {
    if (post) {
      setTagKey(post?.tag || '');
      form.setFieldsValue({
        title: post.title,
        content: post.content,
      });
    }
  }, [post]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        onCancel();
        setTagKey('');
        form.resetFields();
      }}
      footer={null}
      closeIcon={<CloseOutlined style={{ color: colors.secondary }} />}
      centered
    >
      <Title level={4}>{title}</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onSubmit({
            ...values,
            tag: tagKey,
          });
        }}
      >
        <Flex vertical gap={14}>
          <CustomFormItem name="tag">
            <Dropdown
              menu={{
                ...(tagKey && { activeKey: tagKey }),
                items: tagOptions,
                onClick: (e) => {
                  setTagKey(e.key);
                },
              }}
            >
              <Button
                color="primary"
                variant="outlined"
                block={isMobile || isTablet}
              >
                {tagKey || 'Choose a community'} <DownOutlined />
              </Button>
            </Dropdown>
          </CustomFormItem>
          <CustomFormItem
            name="title"
            rules={[{ required: true, message: 'Title is required' }]}
          >
            <Input placeholder="Title" />
          </CustomFormItem>
          <CustomFormItem
            name="content"
            rules={[{ required: true, message: 'Content is required' }]}
          >
            <Input.TextArea
              placeholder="What’s on your mind..."
              rows={isMobile || isTablet ? 10 : 12}
            />
          </CustomFormItem>
          <CustomFormItem>
            <Flex
              vertical={isMobile || isTablet}
              justify={isMobile || isTablet ? 'center' : 'end'}
              gap={10}
            >
              <Button color="primary" variant="outlined">
                Cancel
              </Button>
              <Button
                color="primary"
                variant="solid"
                htmlType="submit"
                loading={isPending}
              >
                Post
              </Button>
            </Flex>
          </CustomFormItem>
        </Flex>
      </Form>
    </Modal>
  );
};
