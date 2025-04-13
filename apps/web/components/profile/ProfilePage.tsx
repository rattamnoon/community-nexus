'use client';
import { useAxios } from '@/hooks/useAxios';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Avatar,
  Button,
  Col,
  Flex,
  Row,
  Skeleton,
  Typography,
  Upload,
} from 'antd';
import { AxiosInstance } from 'axios';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';

const { Title, Text } = Typography;

const fetchProfile = async (instance: AxiosInstance, userId: string) => {
  const response = await instance.get(`/users/${userId}`);
  return response.data;
};

export const ProfilePage = () => {
  const { instance } = useAxios();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userId = session?.user?.id || '';
  const mainUrl = process.env.NEXT_PUBLIC_API_URL;

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => fetchProfile(instance, userId),
  });

  const { mutate: uploadImage } = useMutation({
    mutationFn: async (file: File) => {
      const buffer = await file.arrayBuffer();
      const blob = new Blob([buffer], { type: file.type });
      const formData = new FormData();
      formData.append('file', blob, file.name);
      return instance.post(`/users/${userId}/upload`, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  return (
    <Row justify="center">
      <Col xs={24} md={24} lg={16} style={{ padding: 20 }}>
        <Skeleton active loading={isLoading}>
          <Flex vertical gap={16}>
            <Flex vertical gap={8}>
              <Avatar src={`${mainUrl}/users/${userId}/avatar`} size={100} />
              <Flex gap={8}>
                <Upload
                  accept="image/*"
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={(info) => {
                    uploadImage(info.file as unknown as File);
                  }}
                >
                  <Button variant="filled" color="primary">
                    <UploadOutlined />
                    Upload Profile Picture
                  </Button>
                </Upload>
              </Flex>
            </Flex>
            <Flex vertical gap={8}>
              <Title level={2}>{profile?.username}</Title>
              <Text type="secondary">
                Created at{' '}
                {dayjs(profile?.createdAt).format('DD/MM/YYYY HH:mm')}
              </Text>
              <Text type="secondary">
                Updated at{' '}
                {dayjs(profile?.updatedAt).format('DD/MM/YYYY HH:mm')}
              </Text>
            </Flex>
          </Flex>
        </Skeleton>
      </Col>
    </Row>
  );
};
