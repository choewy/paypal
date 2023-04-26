import { FC, useCallback } from 'react';
import { getErrorMessage, paypalAPI } from '../api';

export const OrderPage: FC = () => {
  const onClick = useCallback(async () => {
    try {
      const res = await paypalAPI.createOrder();
      window.open(res.url, 'Paypal');
    } catch (e) {
      alert(getErrorMessage(e));
    }
  }, []);

  return (
    <div>
      <button onClick={onClick}>결재하기</button>
    </div>
  );
};
