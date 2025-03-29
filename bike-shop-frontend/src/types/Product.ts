import { Option } from './Option';

export type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  image_url?: string;
  description?: string;
  options?: Option[];
};
