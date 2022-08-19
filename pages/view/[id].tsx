import axios from 'axios';
import { ITEM_API_URL } from '../../constants';
import { Item } from '@/interfaces';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { ItemDetail } from '../../components';
import Head from 'next/head';

interface Props {
  item: Item;
}

const View: NextPage<Props> = ({ item }: Props) => {
  return (
    <>
      {item && (
        <>
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description} />
          </Head>
          <ItemDetail item={item} />
        </>
      )}
    </>
  );
};

export default View;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  const { id } = ctx.params as { id: string };
  const res = await axios({ method: 'get', url: ITEM_API_URL(id) });
  const data = res.data;

  return {
    props: {
      item: data,
    },
  };
};
