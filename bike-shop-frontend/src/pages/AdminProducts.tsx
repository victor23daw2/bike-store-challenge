import { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../types/Product';
import { Option } from '../types/Option';


const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [form, setForm] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'bicycle',
    price: 0,
    description: '',
    image_url: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchOptions();
  }, []);

  const fetchOptions = () => {
    console.log('Fetching options...');
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/options`)
      .then(res => {
        console.log('Options loaded:', res.data);
        setOptions(res.data);
      })
      .catch(error => {
        console.error('Error fetching options:', error);
      });
  };



  const fetchProducts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/admin/products`)
      .then(res => setProducts(res.data))
      .catch(console.error);
  };

  const createProduct = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/v1/admin/products`, {
      product: form,
      option_ids: selectedOptions
    })
      .then(() => {
        fetchProducts();
        setForm({ name: '', category: 'bicycle', price: 0, description: '', image_url: '' });
      })
      .catch(console.error);
  };

  const deleteProduct = (id: number) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/admin/products/${id}`)
      .then(fetchProducts)
      .catch(console.error);
  }; console.log("Component loaded"); // debe aparecer
  console.log("options state:", options); // aunque esté vacío

  const groupedOptions = options.reduce((acc: { [key: string]: Option[] }, option) => {
    const categoryName = option.option_category?.name || 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(option);
    return acc;
  }, {});
  
  

  return (

    <div className="container mt-4">
      <h2 className="mb-4">Admin - Manage Products</h2>

      <div className="card p-3 mb-4">
        <h4>Add New Product</h4>
        <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="form-control mb-2" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <input className="form-control mb-2" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })} />
        <input className="form-control mb-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input className="form-control mb-2" placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        <h5 className="mt-3">Select Options</h5>
        {Object.entries(groupedOptions).map(([category, optionsInCategory]) => (
          <div key={category} className="mb-3">
            <h6 className='text-capitalize'>{category}</h6>
            {optionsInCategory.map(option => (
              <div key={option.id} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`option-${option.id}`}
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => {
                    if (selectedOptions.includes(option.id)) {
                      setSelectedOptions(selectedOptions.filter(id => id !== option.id));
                    } else {
                      setSelectedOptions([...selectedOptions, option.id]);
                    }
                  }}
                />
                <label className="form-check-label" htmlFor={`option-${option.id}`}>
                  {option.name}
                </label>
              </div>
            ))}
          </div>
        ))}


        <button className="btn btn-success" onClick={createProduct}>Create</button>
      </div>

      <div>
        <h4>Existing Products</h4>
        {products.map((product) => (
          <div key={product.id} className="card mb-2 p-3">
            <strong>{product.name}</strong> - {product.category} – €{product.price}
            <button className="btn btn-danger btn-sm float-end" onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
