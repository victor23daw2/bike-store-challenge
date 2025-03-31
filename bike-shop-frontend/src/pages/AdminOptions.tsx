import { useEffect, useState } from 'react';
import axios from 'axios';
import { Option } from '../types/Option';
import AdminOptionForm from './AdminOptionForm';

const AdminOptions = () => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/options`)
      .then((res) => setOptions(res.data))
      .catch(console.error);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Options</h2>

      <AdminOptionForm onCreated={fetchOptions} />

      <div className="row mt-4">
        {options.map((opt) => (
          <div key={opt.id} className="col-md-6 mb-3">
            <div className="card p-3 shadow-sm">
              <h5 className="text-capitalize">{opt.name}</h5>
              <p className="mb-1"><strong>Extra Price:</strong> €{opt.extra_price}</p>
              <p className="mb-0">
                <strong>Stock:</strong>{' '}
                {opt.stock === 0 ? (
                  <span className="text-danger">Out of stock</span>
                ) : (
                  opt.stock
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminOptions;