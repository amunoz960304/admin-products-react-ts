import {
  Link,
  Form,
  useActionData,
  type ActionFunctionArgs,
  redirect,
  type LoaderFunctionArgs,
  useLoaderData,
} from 'react-router-dom';
import Message from '../components/Message';
import { getProductById, updateProduct } from '../services/ProductService';
import type { Product } from '../types';

const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No Disponible', value: false },
];

export const action = async ({
  request,
  params,
}: ActionFunctionArgs): Promise<string> => {
  const data = Object.fromEntries(await request.formData());

  let error: string = '';
  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }

  if (error.length) {
    return error;
  }

  await updateProduct(+params.id!, data);

  //@ts-ignore
  return redirect('/');
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  if (id !== undefined) {
    const product = await getProductById(+id);

    if (!product) {
      return redirect('/');
    }

    return product;
  }
  return {};
};

const EditProduct = () => {
  const error = useActionData() as string;
  const product = useLoaderData() as Product;

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Editar Producto</h2>
        <Link
          to={'/'}
          className='rounded-md bg-indigo-600 p-3 text-sm shadow-sm font-bold text-white hover:bg-indigo-500'
        >
          Inicio
        </Link>
      </div>

      <Form className='mt-10' method='POST'>
        {error && <Message message={error} isError={true} />}
        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='name'>
            Nombre Producto:
          </label>
          <input
            id='name'
            type='text'
            className='mt-2 block w-full p-3 bg-gray-50'
            placeholder='Nombre del Producto'
            name='name'
            defaultValue={product.name}
          />
        </div>
        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='price'>
            Precio:
          </label>
          <input
            id='price'
            type='number'
            className='mt-2 block w-full p-3 bg-gray-50'
            placeholder='Precio Producto. ej. 200, 300'
            name='price'
            defaultValue={product.price}
          />
        </div>
        <div className='mb-4'>
          <label className='text-gray-800' htmlFor='availability'>
            Disponibilidad:
          </label>
          <select
            id='availability'
            className='mt-2 block w-full p-3 bg-gray-50'
            name='availability'
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type='submit'
          className='mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded'
          defaultValue='Editar Producto'
        />
      </Form>
    </>
  );
};

export default EditProduct;
