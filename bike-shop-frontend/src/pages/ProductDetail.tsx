import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/Product';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(console.error);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
    <Link to="/" className="btn btn-link mb-3">Back to Products</Link>

    <div className="card shadow-sm">
      {product.image_url && (
        <img
          src={product.image_url}
          className="card-img-top"
          alt={product.name}
          style={{ objectFit: 'cover', height: '300px' }}
        />
      )}
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <h5 className="text-muted">{product.category}</h5>
        <p className="fs-5">Price: €{product.price}</p>
      </div>
    </div>
    </>
  );
};

export default ProductDetail;
