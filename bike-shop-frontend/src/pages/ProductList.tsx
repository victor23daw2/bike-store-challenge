import { useEffect, useState } from 'react';
import { getProducts } from '../api/products';
import { Product } from '../types/Product';
import { Link } from 'react-router-dom';

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
            {product.image_url && (
              <img
                src={product.image_url}
                className="card-img-top"
                alt={product.name}
                style={{ objectFit: 'cover', height: '200px' }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted text-capitalize">{product.category}</h6>
              <p className="card-text">Price: €{product.price}</p>
              <Link to={`/products/${product.id}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
