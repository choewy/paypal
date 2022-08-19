import styles from './ItemList.module.css';
import { Divider, Grid, Header } from 'semantic-ui-react';
import { Item } from '@/src/interfaces';
import Link from 'next/link';
import { NextPage } from 'next';

interface Props {
  title: string;
  items: Item[];
}

export const ItemList: NextPage<Props> = ({ title, items }) => {
  return (
    <div>
      <Header as="h3" style={{ paddingTop: 40 }}>
        {title}
      </Header>
      <Divider />
      <Grid columns={3}>
        <Grid.Row>
          {items.map((item) => (
            <Grid.Column key={`${item.id}-${item.name}-${item.image_link}`}>
              <Link href={`/view/${item.id}`}>
                <a>
                  <div className={styles.item_wrap}>
                    <img
                      src={item.image_link}
                      alt={item.name}
                      className={styles.item_image}
                    />
                    <strong className={styles.item_name}>{item.name}</strong>
                    <strong className={styles.item_info}>
                      {item.category} {item.product_type}
                    </strong>
                    <strong className={styles.item_price}>${item.price}</strong>
                  </div>
                </a>
              </Link>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
};
