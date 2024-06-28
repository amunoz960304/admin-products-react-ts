import {
  useNavigate,
  Form,
  type ActionFunctionArgs,
  redirect,
  useFetcher,
} from 'react-router-dom';
import type { Product } from '../types';
import { formatPrice } from '../utils';
import { deleteProduct } from '../services/ProductService';

type ProductDetailsProps = {
  product: Product;
};

export const action = async ({
  params,
}: ActionFunctionArgs): Promise<string> => {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
  }
  //@ts-ignore
  return redirect('/');
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const isAvailable = product.availability ? 'Disponible' : 'No Disponible';
  return (
    <tr className='border-b '>
      <td className='p-3 text-lg text-gray-800'>{product.name}</td>
      <td className='p-3 text-lg text-gray-800'>
        {formatPrice(product.price)}
      </td>
      <td className='p-3 text-lg text-gray-800'>
        <fetcher.Form method='POST'>
          <button
            type='submit'
            name='id'
            value={product.id}
            className={`${
              isAvailable ? 'text-black' : 'text-white'
            } rounded-lg p-2 text-sm uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
          >
            {isAvailable}
          </button>
        </fetcher.Form>
      </td>
      <td className='p-3 text-lg text-gray-800 '>
        <div className='flex gap-2 items-center'>
          <button
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className='bg-indigo-600 rounded-lg w-full p-2 uppercase font-bold text-center text-white text-sm'
          >
            Editar
          </button>
          <Form
            className='w-full'
            method='POST'
            action={`products/${product.id}/delete`}
            onSubmit={(e) => {
              if (!confirm('Deseas eliminar el producto?')) {
                e.preventDefault();
              }
            }}
          >
            <input
              type='submit'
              className='bg-red-600 rounded-lg w-full p-2 uppercase font-bold text-center text-white text-sm'
              value={'eliminar'}
            />
          </Form>
        </div>
      </td>
    </tr>
  );
};

export default ProductDetails;
