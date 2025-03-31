export type CartItem = {
    id: number;
    productId: number;
    productName: string;
    price: number;
    options: {
      category: string;
      name: string;
      extra_price: number;
    }[];
  };
  