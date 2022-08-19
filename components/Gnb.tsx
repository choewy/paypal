import { useRouter } from 'next/router';
import { MouseEvent, Component } from 'react';
import { Menu, MenuItemProps } from 'semantic-ui-react';

const menuItems = [
  {
    name: 'home',
    pathname: '/',
  },
  {
    name: 'about',
    pathname: '/about',
  },
];

export const Gnb = () => {
  const router = useRouter();

  const handleItemClick = (
    _: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    props: MenuItemProps,
  ) => {
    const menuItem = menuItems.find((m) => m.name === props.name);
    menuItem && router.push(menuItem.pathname);
  };

  return (
    <Menu inverted>
      {menuItems.map((m) => (
        <Menu.Item
          key={`${m.name}-${m.pathname}`}
          name={m.name}
          active={router.pathname === m.pathname}
          onClick={handleItemClick}
        />
      ))}
    </Menu>
  );
};
