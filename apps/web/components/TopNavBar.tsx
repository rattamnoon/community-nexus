'use client';

import { Routes } from '@/constant/routes';
import {
  ArrowRightOutlined,
  LogoutOutlined,
  MenuOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Flex,
  MenuProps,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import { signOut, useSession } from 'next-auth/react';
import { Castoro } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLocalStorage, useMediaQuery } from 'usehooks-ts';
import { Menus } from './Menus';

const { Text } = Typography;

const castoro = Castoro({
  weight: '400',
  subsets: ['latin'],
});

const Caption = styled.p`
  color: white;
  font-style: italic;
  font-size: 1.25rem;
`;

const MenuWithDropdown = ({
  menuItems,
  username,
}: {
  username?: string;
  menuItems: MenuProps['items'];
}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id || '';
  const mainUrl = process.env.NEXT_PUBLIC_API_URL;

  return (
    <Space direction="horizontal" align="center">
      <Dropdown menu={{ items: menuItems }} trigger={['click']}>
        <Button type="text" style={{ color: 'white' }}>
          <Text style={{ color: 'white' }}>{username}</Text>
          <Avatar
            src={`${mainUrl}/users/${userId}/avatar`}
            style={{ width: 24, height: 24 }}
          />
        </Button>
      </Dropdown>
    </Space>
  );
};

const SignInButton = ({ onSignIn }: { onSignIn: () => void }) => {
  return (
    <Button variant="solid" color="primary" onClick={onSignIn}>
      Sign In
    </Button>
  );
};

const DrawerMenu = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={280}
      closable={false}
      styles={{
        content: {
          backgroundColor: '#243831',
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
        },
      }}
    >
      <Flex vertical gap={36}>
        <ArrowRightOutlined
          onClick={onClose}
          style={{ color: '#FFFFFF', fontSize: 16, cursor: 'pointer' }}
        />
        <Menus colorActive="#FFFFFF" padding={0} />
      </Flex>
    </Drawer>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  background-color: #243831;
  padding: 16px;
  height: 48px;
  align-items: center;
`;

export const TopNavBar = () => {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 992px)');
  const [open, setOpen] = useLocalStorage('isOpenMenu', false);

  const { data, status } = useSession({
    required: false,
  });

  const username = data?.user?.username;

  const menuItems: MenuProps['items'] = [
    {
      label: 'My Profile',
      key: '0',
      icon: <ProfileOutlined />,
      onClick: () => router.push(Routes.Profile),
    },
    {
      label: 'Logout',
      key: '2',
      icon: <LogoutOutlined />,
      onClick: () => signOut(),
    },
  ];

  const onSignIn = () => {
    router.push(Routes.SignIn);
  };

  useEffect(() => {
    if (!isMobile && !isTablet) {
      setOpen(false);
    }
  }, [isMobile, isTablet]);

  return (
    <Container>
      <Link href={Routes.Home} style={{ width: '100%' }}>
        <Space align="center">
          <Caption className={castoro.className}>a Board</Caption>
        </Space>
      </Link>

      {status === 'loading' ? (
        <Skeleton.Input active />
      ) : (
        <Space direction="horizontal" align="center">
          {status === 'unauthenticated' ? (
            <SignInButton onSignIn={onSignIn} />
          ) : isMobile || isTablet ? (
            <Button
              type="text"
              style={{ color: 'white' }}
              onClick={() => setOpen(true)}
            >
              <MenuOutlined />
            </Button>
          ) : (
            <MenuWithDropdown menuItems={menuItems} username={username} />
          )}
        </Space>
      )}
      <DrawerMenu open={open} onClose={() => setOpen(false)} />
    </Container>
  );
};
