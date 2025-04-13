import { Routes } from '@/constant/routes';
import { useAxios } from '@/hooks/useAxios';
import { colors } from '@/theme';
import { CloseOutlined } from '@ant-design/icons';
import { CreateCommentDto } from '@repo/api/comments/dto/create-comment.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Space,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { CustomFormItem } from '../common/CustomFormItem';

dayjs.extend(relativeTime);

const { Title } = Typography;
const { TextArea } = Input;

const CommentModal = ({
  open,
  onCancel,
  onComment,
  isPending,
}: {
  open: boolean;
  onCancel: () => void;
  onComment: (content: string) => void;
  isPending: boolean;
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={open}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      footer={null}
      closeIcon={<CloseOutlined style={{ color: colors.secondary }} />}
      centered
    >
      <Title level={4}>Add Comments</Title>
      <Form
        name="add-comment-modal"
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onComment(values.content);
          form.resetFields();
        }}
      >
        <Flex vertical gap={20}>
          <CustomFormItem
            name="content"
            rules={[{ required: true, message: 'Comment is required' }]}
          >
            <TextArea rows={4} placeholder="What's on your mind..." />
          </CustomFormItem>
          <Flex vertical gap={10}>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                onCancel();
                form.resetFields();
              }}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="solid"
              loading={isPending}
              htmlType="submit"
            >
              Post
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};

export const AddComment = ({ postId }: { postId: number }) => {
  const router = useRouter();
  const [modalApi, modalContextHolder] = Modal.useModal();
  const [open, setOpen] = useState(false);
  const { instance } = useAxios();
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 992px)');
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const { status } = useSession();
  const [messageApi, messageContextHolder] = message.useMessage();
  const isSmallScreen = isMobile || isTablet;

  const { mutate: createComment, isPending } = useMutation({
    mutationFn: (comment: CreateCommentDto) => {
      return instance.post(`/comments`, comment);
    },
    onSuccess: () => {
      setOpen(false);
      setOpenModal(false);
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: (error: any) => {
      messageApi.error(
        error?.response?.data?.message || 'Failed to create comment',
      );
    },
  });

  const handleAddComment = () => {
    if (status === 'unauthenticated') {
      modalApi.warning({
        title: 'You need to sign in to create a post',
        okText: 'Sign in',
        cancelText: 'Cancel',
        centered: true,
        onOk: () => {
          const callbackUrl = Routes.BlogDetail(postId);
          router.push(`${Routes.SignIn}?callbackUrl=${callbackUrl}`);
        },
      });
    } else {
      if (isSmallScreen) {
        setOpenModal(true);
      } else {
        setOpen(true);
      }
    }
  };

  return (
    <>
      {messageContextHolder}
      {modalContextHolder}
      {openModal && (
        <CommentModal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          onComment={(content) => createComment({ content, postId })}
          isPending={isPending}
        />
      )}

      {!open ? (
        <Button variant="outlined" color="primary" onClick={handleAddComment}>
          Add Comments
        </Button>
      ) : (
        <Flex vertical style={{ width: '100%' }}>
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) =>
              createComment({ content: values.content, postId })
            }
          >
            <Flex vertical gap={8} style={{ width: '100%' }}>
              <CustomFormItem
                name="content"
                rules={[{ required: true, message: 'Comment is required' }]}
              >
                <TextArea rows={4} placeholder="What's on your mind..." />
              </CustomFormItem>
              <Flex justify="flex-end">
                <Space>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="solid"
                    color="primary"
                    loading={isPending}
                    htmlType="submit"
                  >
                    Post
                  </Button>
                </Space>
              </Flex>
            </Flex>
          </Form>
        </Flex>
      )}
    </>
  );
};
