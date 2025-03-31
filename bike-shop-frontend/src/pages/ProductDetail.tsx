import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { Option } from '../types/Option';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';



const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});

  const { addToCart } = useCart();

  const [invalidCombinations, setInvalidCombinations] = useState<{ option_1_id: number, option_2_id: number }[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/invalid_combinations`)
      .then(res => setInvalidCombinations(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(console.error);
  }, [id]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/${id}`)
      .then(res => {
        console.log('Product loaded:', res.data);
        setProduct(res.data);
      })
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
    const category = option.option_category?.name || 'Uncategorized';

    if (!groupedOptions[category]) {
      groupedOptions[category] = [];
    }
    groupedOptions[category].push(option);
  });

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
                  <option key={option.id} value={option.id} disabled={option.stock === 0}>
                    {option.name} {option.stock === 0 ? '(Out of stock)' : ''}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            className="btn btn-success mt-3"
            onClick={() => {
              const totalCategories = Object.keys(groupedOptions).length;
              const selectedCount = Object.keys(selectedOptions).length;

              if (selectedCount < totalCategories) {
                alert('Please select an option for each category.');
                return;
              }

              const selected = Object.entries(selectedOptions).map(([category, optionId]) => {
                const option = product.options?.find((opt) => opt.id === optionId);
                return {
                  category,
                  name: option?.name || '-',
                  extra_price: Number(option?.extra_price) || 0
                };
              });

              const selectedOptionIds = Object.values(selectedOptions);

              const isInvalid = invalidCombinations.some(({ option_1_id, option_2_id }) => {
                return selectedOptionIds.includes(option_1_id) && selectedOptionIds.includes(option_2_id);
              });

              if (isInvalid) {
                alert("This combination of options is not allowed.");
                return;
              }


              addToCart({
                productId: product.id,
                productName: product.name,
                price: product.price,
                options: selected
              });

              alert(`${product.name} added to cart`);
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
