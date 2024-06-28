import { Link, useLoaderData, type ActionFunctionArgs } from 'react-router-dom';
import { getProducts, updateProductStatus } from '../services/ProductService';
import { Product } from '../types';
import ProductDetails from '../components/ProductDetails';

export const loader = async () => {
  const products = await getProducts();
  if (products) {
    return products;
  }

  return {};
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const data = Object.fromEntries(await request.formData());

  await updateProductStatus(+data.id);
  return '';
};

const Products = () => {
  const products = useLoaderData() as Product[];

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Productos</h2>
        <Link
          to={'/products/new'}
          className='rounded-md bg-indigo-600 p-3 text-sm shadow-sm font-bold text-white hover:bg-indigo-500'
        >
          Agregar Producto
        </Link>
      </div>
      {products.length ? (
        <div className='p-2'>
          <table className='w-full mt-5 table-auto'>
            <thead className='bg-slate-800 text-white'>
              <tr>
                <th className='p-2'>Producto</th>
                <th className='p-2'>Precio</th>
                <th className='p-2'>Disponibilidad</th>
                <th className='p-2'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductDetails key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay productos</p>
      )}
    </>
  );
};

export default Products;
