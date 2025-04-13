'use client';

import { Routes } from '@/constant/routes';
import { axiosInstance } from '@/utils/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { Form, message } from 'antd';
import { useRouter } from 'next/navigation';
import {
  Container,
  CustomButton,
  CustomCard,
  CustomInput,
  CustomInputPassword,
  CustomLink,
  CustomTitle,
} from './SignInPage';

const mutationFn = async (values: { username: string; password: string }) => {
  try {
    const response = await axiosInstance.post('/auth/signup', {
      username: values.username,
      password: values.password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Failed to sign up');
  }
};

export const SignUpPage = () => {
  const [form] = Form.useForm();
  const [messageApi, messageContextHolder] = message.useMessage();
  const router = useRouter();
  const { mutate: signUp, isPending } = useMutation({
    mutationFn,
    onError(error) {
      messageApi.error(error.message);
    },
    onSuccess() {
      messageApi.success('Sign up successful');
      router.push(Routes.SignIn);
    },
  });

  const handleSubmit = async (values: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    signUp(values);
  };

  return (
    <Container>
      {messageContextHolder}
      <CustomCard>
        <CustomTitle level={3}>Sign Up</CustomTitle>
        <Form
          name="signUpForm"
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
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <CustomInputPassword placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <CustomInputPassword placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <CustomButton type="primary" htmlType="submit" loading={isPending}>
              Sign Up
            </CustomButton>
          </Form.Item>
        </Form>
        <CustomLink onClick={() => router.push(Routes.SignIn)}>
          Already have an account? Sign In
        </CustomLink>
      </CustomCard>
    </Container>
  );
};
