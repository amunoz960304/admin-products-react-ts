import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
} from 'react-router-dom';
import Message from '../components/Message';
import { createProduct } from '../services/ProductService';

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<string> => {
  const data = Object.fromEntries(await request.formData());

  let error: string = '';
  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }

  if (error.length) {
    return error;
  }

  await createProduct(data);
  //@ts-ignore
  return redirect('/');
};

const NewProduct = () => {
  const error = useActionData() as string;
  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-500'>Crear Producto</h2>
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
          />
        </div>
        <input
          type='submit'
          className='mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded'
          value='Registrar Producto'
        />
      </Form>
    </>
  );
};

export default NewProduct;
