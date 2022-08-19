import { NextPage } from 'next';
import Head from 'next/head';
import { Icon } from 'semantic-ui-react';

const ErrorOther: NextPage = () => {
  return (
    <div style={{ padding: '200px 0', textAlign: 'center', fontSize: 30 }}>
      <Head>
        <title>Error | CHOEWY</title>
      </Head>

      <div>
        <Icon name="warning circle" color="red" />
        <span>Error Page</span>
      </div>
    </div>
  );
};

export default ErrorOther;
