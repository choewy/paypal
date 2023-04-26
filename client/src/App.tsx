import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { OrderCancelPage, OrderCompletePage, OrderPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <OrderPage />,
  },
  {
    path: '/ok',
    element: <OrderCompletePage />,
  },
  {
    path: '/cancel',
    element: <OrderCancelPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
