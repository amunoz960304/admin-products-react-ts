import { safeParse } from 'valibot';
import {
  DraftProductSchema,
  DraftUpdateProductSchema,
  ProductSchema,
  ProductsSchema,
} from '../types';
import backendAxios from '../configs/backendAxios';
import { Product } from '../types/index';

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export const createProduct = async (data: ProductData): Promise<void> => {
  try {
    const response = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });

    if (response.success) {
      await backendAxios.post('/products', response.output);
    } else {
      throw new Error('Datos no válidos');
    }
  } catch (error) {}
};

export const getProducts = async (): Promise<Product | void> => {
  try {
    const { data } = await backendAxios('/products');
    const response = safeParse(ProductsSchema, data);
    if (response.success) {
      return data;
    }
  } catch (error) {}
};

export const getProductById = async (
  id: Product['id']
): Promise<Product | void> => {
  try {
    const { data } = await backendAxios(`/products/${id}`);
    const response = safeParse(ProductSchema, data);
    if (response.success) {
      return response.output;
    }
  } catch (error) {}
};

export const deleteProduct = async (id: Product['id']): Promise<boolean> => {
  try {
    await backendAxios.delete(`/products/${id}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const updateProduct = async (
  id: Product['id'],
  productData: ProductData
): Promise<Product | void> => {
  try {
    const response = safeParse(DraftUpdateProductSchema, {
      name: productData.name,
      price: +productData.price,
      availability: productData.availability === 'true',
    });

    if (response.success) {
      const { data } = await backendAxios.put(
        `/products/${id}`,
        response.output
      );

      return data;
    }
  } catch (error) {}
};

export const updateProductStatus = async (
  id: Product['id']
): Promise<Product | void> => {
  try {
    const { data } = await backendAxios.patch(`/products/update-status/${id}`);
    return data;
  } catch (error) {}
};
