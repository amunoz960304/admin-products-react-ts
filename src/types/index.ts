import {
  boolean,
  number,
  object,
  string,
  InferInput,
  array,
  optional,
} from 'valibot';

export const DraftProductSchema = object({
  name: string(),
  price: number(),
});

export const DraftUpdateProductSchema = object({
  name: optional(string()),
  price: optional(number()),
  availability: optional(boolean()),
});

export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean(),
  createdAt: string(),
  updatedAt: string(),
});

export const ProductsSchema = array(ProductSchema);

export type Product = InferInput<typeof ProductSchema>;
