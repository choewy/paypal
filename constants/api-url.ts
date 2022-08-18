const apiHost = 'http://makeup-api.herokuapp.com';
const itemPath = 'api/v1/products';

export const ITEMS_API_URL = () => {
  return `${apiHost}/${itemPath}.json?brand=maybelline`;
};

export const ITEM_API_URL = (id: string) => {
  console.log(id);
  return `${apiHost}/${itemPath}/${id}.json`;
};
