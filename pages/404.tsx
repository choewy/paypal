import { NextPage } from 'next';
import Head from 'next/head';
import { Icon } from 'semantic-ui-react';

const Error404: NextPage = () => {
  return (
    <div style={{ padding: '200px 0', textAlign: 'center', fontSize: 30 }}>
      <Head>
        <title>404 | CHOEWY</title>
      </Head>

      <div>
        <Icon name="warning circle" color="red" />
        <span>404 : Not Found Page</span>
      </div>
    </div>
  );
};

export default Error404;
