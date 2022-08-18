import { NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { ITEMS_API_URL } from '../constants';
import { useEffect, useState } from 'react';
import { ItemList } from '../components';
import { Item } from '@/interfaces';

const Home: NextPage = () => {
  const [items, setItems] = useState<Item[]>([]);

  const getData = () => {
    axios({
      method: 'get',
      url: ITEMS_API_URL(),
    }).then((res) => {
      setItems(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>HOME | CHOEWY</title>
      </Head>
      <ItemList title="베스트 상품" items={items.slice(0, 9)} />
      <ItemList title="신상품" items={items.slice(9)} />
    </div>
  );
};

export default Home;
