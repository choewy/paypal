import { NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { ITEMS_API_URL } from '../src/constants';
import { useEffect, useState } from 'react';
import { ItemList } from '../src/components';
import { Item } from '@/src/interfaces';
import { Loader } from 'semantic-ui-react';

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [items, setItems] = useState<Item[]>([]);

  const getData = () => {
    axios({
      method: 'get',
      url: ITEMS_API_URL(),
    }).then((res) => {
      setItems(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Head>
        <title>HOME | CHOEWY</title>
        <meta name="description" content="CHOEWY's HOME" />
      </Head>
      {isLoading ? (
        <div style={{ padding: '300px 0' }}>
          <Loader inline="centered" active>
            loading...
          </Loader>
        </div>
      ) : (
        <>
          <ItemList title="베스트 상품" items={items.slice(0, 9)} />
          <ItemList title="신상품" items={items.slice(9)} />
        </>
      )}
    </div>
  );
};

export default Home;
