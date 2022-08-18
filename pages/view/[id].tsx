import axios from 'axios';
import { ITEM_API_URL } from '../../constants';
import { Item } from '@/interfaces';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ItemDetail } from '../../components';
import { InitItem } from '../../states';

const View: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [item, setItem] = useState<Item>(new InitItem());

  const getItem = () => {
    axios({
      method: 'get',
      url: ITEM_API_URL(id as string),
    }).then((res) => {
      setItem(res.data);
    });
  };

  useEffect(() => {
    if (id !== undefined) {
      getItem();
    }
  }, [id]);

  return (
    <div>
      <ItemDetail item={item} />
    </div>
  );
};

export default View;
