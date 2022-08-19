import { NextPage } from 'next';
import { Button, Header } from 'semantic-ui-react';
import { Item } from '../interfaces';
import styles from './ItemDetail.module.css';

interface Props {
  item: Item;
}

export const ItemDetail: NextPage<Props> = ({ item }) => {
  return (
    <>
      <div className={styles.item_wrap}>
        <div className={styles.item_img}>
          <img src={item.image_link} alt={item.name} />
        </div>
        <div className={styles.item_info}>
          <strong className={styles.item_name}>{item.name}</strong>
          <strong className={styles.item_price}>
            {item.price && '$'}
            {item.price}
          </strong>
          <span className={styles.item_info_text}>
            {item.category ? `${item.category}/` : ''}
            {item.product_type}
          </span>
          <Button color="orange">구매하기</Button>
        </div>
      </div>
      <Header as="h3">Description</Header>
      <p>{item.description}</p>
    </>
  );
};
