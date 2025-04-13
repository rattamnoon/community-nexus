'use client';

import { Routes } from '@/constant/routes';
import styled from '@emotion/styled';
import { Button, Form, Input, message, Typography } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const { Title } = Typography;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 1.5rem;
`;

export const CustomCard = styled.div`
  width: 100%;
  max-width: 300px;
`;

export const CustomTitle = styled(Title)`
  color: white !important;
  margin-bottom: 1.5rem !important;
`;

export const CustomInput = styled(Input)`
  background-color: white;
  border-radius: 4px;
  height: 40px;
`;

export const CustomInputPassword = styled(Input.Password)`
  background-color: white;
  border-radius: 4px;
  height: 40px;
`;

export const CustomButton = styled(Button)`
  background-color: #2ecc71;
  border-color: #2ecc71;
  width: 100%;
  height: 40px;
  font-weight: 500;

  &:hover,
  &:focus {
    background-color: #27ae60;
    border-color: #27ae60;
  }
`;

export const CustomLink = styled.a`
  color: white;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 1rem;
  display: block;
  text-align: center;
  text-align: center;

  &:hover {
    color: #2ecc71;
  }
`;

export const SignInPage = () => {
  const [form] = Form.useForm<{ username: string; password: string }>();
  const [messageApi, messageContextHolder] = message.useMessage();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? Routes.Home;

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    setIsLoading(true);
    const result = await signIn('credentials', {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    if (result?.error || !result?.ok) {
      messageApi.error(result?.error || 'Failed to sign in');
    } else {
      router.push(callbackUrl);
    }

    setIsLoading(false);
  };

  return (
    <Container>
      {messageContextHolder}
      <CustomCard>
        <CustomTitle level={3}>Sign In</CustomTitle>
        <Form
          name="signInForm"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <CustomInput placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <CustomInputPassword placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <CustomButton type="primary" htmlType="submit" loading={isLoading}>
              Sign In
            </CustomButton>
          </Form.Item>
        </Form>
        <CustomLink onClick={() => router.push(Routes.SignUp)}>
          Don't have an account? Sign Up
        </CustomLink>
      </CustomCard>
    </Container>
  );
};
