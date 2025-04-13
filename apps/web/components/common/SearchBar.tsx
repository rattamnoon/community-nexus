import { Routes } from '@/constant/routes';
import { useCreateQueryString } from '@/hooks/useCreateQueryString';
import { SearchIcon } from '@/icons/Search.icon';
import { colors } from '@/theme';
import { axiosInstance } from '@/utils/axiosInstance';
import { CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import { Tag } from '@repo/api/tags/entities/tag.entity';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  ConfigProvider,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Modal,
  Space,
  Typography,
} from 'antd';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

const { Text } = Typography;

const fetchTags = async (): Promise<Tag[]> => {
  const res = await axiosInstance.get('/tags');
  const data = await res.data;
  return data;
};

const CustomInputSearch = ({
  value,
  onSearch,
  suffix,
}: {
  value: string;
  onSearch: (value: string) => void;
  suffix?: React.ReactNode;
}) => (
  <ConfigProvider theme={{ token: { colorBgBase: colors.background } }}>
    <Input
      prefix={<SearchIcon />}
      placeholder="Search"
      value={value}
      style={{ border: '1px solid #D8E9E4' }}
      onChange={(e) => {
        onSearch(e.target.value);
      }}
      suffix={suffix}
    />
  </ConfigProvider>
);

const SearchMobile = ({
  items,
  onCreatePost,
  disabled,
  handleSearch,
}: {
  items: MenuProps['items'];
  onCreatePost: () => void;
  disabled: boolean;
  handleSearch: (key: string, value: string) => void;
}) => {
  const searchParams = useSearchParams();
  const searchText = searchParams.get('searchText') || '';
  const tagKey = searchParams.get('tag');
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <Flex align="center" justify="space-between" gap={16}>
      <Button
        style={{ display: openSearch ? 'none' : 'flex' }}
        type="text"
        onClick={() => setOpenSearch(!openSearch)}
        icon={<SearchIcon />}
      />
      {openSearch && (
        <CustomInputSearch
          value={searchText}
          onSearch={(value) => {
            handleSearch('searchText', value);
          }}
          suffix={<CloseOutlined onClick={() => setOpenSearch(false)} />}
        />
      )}

      <Flex
        align="center"
        justify="center"
        gap={16}
        style={{ display: openSearch ? 'none' : 'flex' }}
      >
        <Dropdown
          menu={{
            ...(tagKey && { activeKey: tagKey }),
            items,
            onClick: (e) => {
              if (e.key === tagKey) {
                handleSearch('tag', '');
              } else {
                handleSearch('tag', e.key);
              }
            },
          }}
        >
          <Button type="text">
            <Space>
              <Text strong>Community</Text>
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Button type="primary" disabled={disabled} onClick={onCreatePost}>
          Create +
        </Button>
      </Flex>
    </Flex>
  );
};

const SearchDesktop = ({
  items,
  onCreatePost,
  disabled,
  handleSearch,
}: {
  items: MenuProps['items'];
  onCreatePost: () => void;
  disabled: boolean;
  handleSearch: (key: string, value: string) => void;
}) => {
  const searchParams = useSearchParams();
  const tagKey = searchParams.get('tag');
  const searchText = searchParams.get('searchText') || '';

  return (
    <Flex align="center" justify="space-between" gap={16}>
      <CustomInputSearch
        value={searchText}
        onSearch={(value) => {
          handleSearch('searchText', value);
        }}
      />
      <Flex align="center" justify="center" gap={16}>
        <Dropdown
          menu={{
            ...(tagKey && { activeKey: tagKey }),
            items,
            onClick: (e) => {
              if (e.key === tagKey) {
                handleSearch('tag', '');
              } else {
                handleSearch('tag', e.key);
              }
            },
          }}
        >
          <Button type="text">
            <Space>
              <Text strong>Community</Text>
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Button type="primary" disabled={disabled} onClick={onCreatePost}>
          Create +
        </Button>
      </Flex>
    </Flex>
  );
};

export const SearchBar = ({
  isOurBlog,
  onCreatePost,
}: {
  isOurBlog?: boolean;
  onCreatePost: () => void;
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 992px)');
  const [modalApi, modalContextHolder] = Modal.useModal();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tagKey = searchParams.get('tag');
  const { status } = useSession();
  const { createQueryString } = useCreateQueryString();

  const { data } = useQuery({
    queryKey: ['tags'],
    queryFn: fetchTags,
  });

  const tags = useMemo(() => data || [], [data]);

  const items: MenuProps['items'] = useMemo(() => {
    return (
      tags.map((tag) => {
        const isActive = tagKey ? tagKey === tag.name : false;

        return {
          label: tag.name,
          key: tag.name,
          extra: isActive ? (
            <CheckOutlined style={{ color: '#4A4A4A' }} />
          ) : null,
        };
      }) || []
    );
  }, [tags, tagKey]);

  const handleCreatePost = () => {
    if (status === 'unauthenticated') {
      modalApi.warning({
        title: 'You need to sign in to create a post',
        okText: 'Sign in',
        cancelText: 'Cancel',
        centered: true,
        onOk: () => {
          const callbackUrl = Routes.Blog;
          router.push(`${Routes.SignIn}?callbackUrl=${callbackUrl}`);
        },
      });
    } else {
      onCreatePost();
    }
  };

  const handleSearch = (key: string, value: string) => {
    const currentPath = isOurBlog ? Routes.OurBlog : Routes.Blog;
    router.push(`${currentPath}?${createQueryString({ [key]: value })}`);
  };

  return (
    <>
      {modalContextHolder}
      {isMobile || isTablet ? (
        <SearchMobile
          items={items}
          onCreatePost={handleCreatePost}
          disabled={status === 'loading'}
          handleSearch={handleSearch}
        />
      ) : (
        <SearchDesktop
          items={items}
          onCreatePost={handleCreatePost}
          disabled={status === 'loading'}
          handleSearch={handleSearch}
        />
      )}
    </>
  );
};
