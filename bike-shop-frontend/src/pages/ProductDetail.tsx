import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { Option } from '../types/Option';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(console.error);
  }, [id]);


  if (!product) {
    return (
      <div className="card shadow-sm">
        <Skeleton height={300} />
        <div className="card-body">
          <h2><Skeleton width={200} /></h2>
          <h5><Skeleton width={100} /></h5>
          <p><Skeleton width={120} /></p>
        </div>
      </div>
    );
  }

  const groupedOptions: { [category: string]: Option[] } = {};

  product.options?.forEach((option) => {
    if (!groupedOptions[option.category]) {
      groupedOptions[option.category] = [];
    }
    groupedOptions[option.category].push(option);
  });

  console.log(selectedOptions);

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
          <h5 className="text-muted text-capitalize">{product.category}</h5>
          <p className="fs-5">Price: €{product.price}</p>
          <p>{product.description}</p>
          {Object.entries(groupedOptions).map(([category, options]) => (
            <div key={category} className="mb-3">
              <label className="form-label text-capitalize"> {category} </label>
              <select
                className="form-select"
                onChange={(e) => {
                  const copy = { ...selectedOptions };
                  copy[category] = parseInt(e.target.value);
                  setSelectedOptions(copy);
                }}
              >
                <option value="">Select an option</option>

                {options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name} {option.stock === 0 ? '(Out of stock)' : ''}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            className="btn btn-success mt-3"
            onClick={() => {
              if (Object.keys(selectedOptions).length < Object.keys(groupedOptions).length) {
                alert("Please select all options");
                return;
              }              
            }}
          >
            Add to Cart
          </button>

        </div>
      </div>
    </>
  );
};

export default ProductDetail;
