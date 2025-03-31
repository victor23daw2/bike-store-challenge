export type OptionCategory = {
  id: number;
  name: string;
};

export type Option = {
  id: number;
  name: string;
  stock: number;
  extra_price: number;
  option_category_id: number;
  option_category?: OptionCategory;
};
