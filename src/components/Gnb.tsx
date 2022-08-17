import { Menu } from 'semantic-ui-react';

export const Gnb = () => {
  let activeItem = 'Home';
  const handleItemClick = (e: any) => {
    const {
      target: { name },
    } = e;
    activeItem = name;
  };
  return (
    <Menu inverted>
      <Menu.Item
        name="Home"
        active={activeItem === 'Home'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="Message"
        active={activeItem === 'Message'}
        onClick={handleItemClick}
      />
      <Menu.Item
        name="Friends"
        active={activeItem === 'Friends'}
        onClick={handleItemClick}
      />
    </Menu>
  );
};
