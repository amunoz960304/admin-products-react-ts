import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import Products, {
  action as productStatusAction,
  loader as productsLoader,
} from './pages/Products';
import NewProduct, { action as newProductAction } from './pages/NewProduct';
import EditProduct, {
  action as editProductAction,
  loader as editLoader,
} from './pages/EditProduct';
import { action as deleteProductAction } from './components/ProductDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: productStatusAction,
      },
      {
        path: 'products/new',
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: 'products/:id/edit',
        element: <EditProduct />,
        action: editProductAction,
        loader: editLoader,
      },
      {
        path: 'products/:id/delete',
        action: deleteProductAction,
      },
    ],
  },
]);
