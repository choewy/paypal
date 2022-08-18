import { NextPage } from 'next';
import { Divider } from 'semantic-ui-react';

export const Footer: NextPage = () => {
  return (
    <>
      <div style={{ padding: '30px 0' }}>
        <Divider />
        <p style={{ marginTop: 30, textAlign: 'center', color: '#999' }}>
          Copyright © CHOEWY. All rights reserved.
        </p>
      </div>
    </>
  );
};
