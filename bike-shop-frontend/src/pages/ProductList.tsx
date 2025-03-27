import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="row">
      {products.map((product) => (
        <div className="col-md-6 mb-4" key={product.id}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
              <p className="card-text">Price: €{product.price}</p>
              <button className="btn btn-primary">View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
