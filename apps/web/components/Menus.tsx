import { Flex, theme, Typography } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

import { Routes } from '@/constant/routes';
import { FromIcon } from '@/icons/From.icon';
import { HomeLineIcon } from '@/icons/HomeLine.icon';
import { useLocalStorage } from 'usehooks-ts';
const { Text } = Typography;

type MenusType = {
  colorActive?: string;
  padding?: number;
};

export const Menus = ({ colorActive, padding = 20 }: MenusType) => {
  const router = useRouter();
  const pathname = usePathname();
  const [_, setOpen] = useLocalStorage('isOpenMenu', false);

  const {
    token: { colorBgBase, colorPrimary },
  } = theme.useToken();

  const menuItems = [
    {
      key: Routes.Blog,
      label: (
        <Text strong={pathname === Routes.Blog} style={{ color: colorActive }}>
          Home
        </Text>
      ),
      icon: <HomeLineIcon color={colorActive} />,
    },
    {
      key: Routes.OurBlog,
      label: (
        <Text
          strong={pathname === Routes.OurBlog}
          style={{ color: colorActive }}
        >
          Our Blog
        </Text>
      ),
      icon: <FromIcon color={colorActive} />,
    },
  ];

  return (
    <Flex vertical gap={16} style={{ padding }}>
      {menuItems.map((item) => (
        <Flex
          key={item.key}
          align="center"
          gap={12}
          onClick={() => {
            router.push(item.key);
            setOpen(false);
          }}
          style={{
            cursor: 'pointer',
            color:
              pathname === item.key ? colorActive || colorPrimary : colorBgBase,
          }}
        >
          {item.icon}
          {item.label}
        </Flex>
      ))}
    </Flex>
  );
};
