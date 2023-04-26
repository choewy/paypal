import { FC, useCallback, useEffect } from 'react';
import { getErrorMessage, paypalAPI } from '../api';

export const OrderCompletePage: FC = () => {
  const queries = new URLSearchParams(window.location.search);
  const orderID = queries.get('token');

  const onCapture = useCallback(async () => {
    try {
      if (!orderID) {
        throw new Error('Not Found OrderID');
      }

      const res = await paypalAPI.captureOrder(orderID);
      console.log(res);
    } catch (e) {
      alert(getErrorMessage(e));
    }
  }, [orderID]);

  useEffect(() => {
    onCapture();
  }, [onCapture]);

  return <></>;
};
