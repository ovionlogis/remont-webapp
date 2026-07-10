import data from './data.json';

export interface Price {
  name: string;
  price: number;
  dim: string;
}

export interface Category {
  slug: string;
  name: string;
  items: Price[];
}

export const prices = data as Category[];

export const PRICE_UPDATED_AT = {
  iso: '2026-06-29',
  label: '29 июня 2026 г.'
};
