import { useState, useEffect } from 'react';
import axios from 'axios';
import { OptionCategory } from '../types/Option';
import Swal from 'sweetalert2';

const AdminOptionForm = ({ onCreated }: { onCreated: () => void }) => {
    const [name, setName] = useState('');
    const [stock, setStock] = useState('0');
    const [extraPrice, setExtraPrice] = useState('0');
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [categories, setCategories] = useState<OptionCategory[]>([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/v1/option_categories`)
            .then(res => setCategories(res.data))
            .catch(console.error);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!categoryId) {
            Swal.fire({
                icon: 'error',
                title: 'Please select a category',
                confirmButtonText: 'Accept'
            });
            return;
        }

        axios.post(`${process.env.REACT_APP_API_URL}/api/v1/options`, {
            name,
            stock: Number(stock),
            extra_price: Number(extraPrice),
            option_category_id: categoryId,
        })
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Option created!',
                    showConfirmButton: false,
                    timer: 1500
                });
                setName('');
                setStock('0');
                setExtraPrice('0');
                setCategoryId(null);
                onCreated();
            })
            .catch(console.error);
    };

    return (
        <div className="container mt-4">
            <h2>Create new option</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        className="form-control"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        value={stock}
                        onChange={e => setStock(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Extra Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={extraPrice}
                        onChange={e => setExtraPrice(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select
                        className="form-select"
                        value={categoryId ?? ''}
                        onChange={e => setCategoryId(Number(e.target.value))}
                    >
                        <option value="-1">Select a category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Create option</button>
            </form>
        </div>
    );
};

export default AdminOptionForm;
