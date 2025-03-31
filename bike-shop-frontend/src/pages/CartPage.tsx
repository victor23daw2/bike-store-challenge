import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cart, removeFromCart } = useCart();
    const total = cart.reduce((sum, item) => {
        const itemBase = Number(item.price) || 0;
        const extras = item.options?.reduce((acc, opt) => acc + (Number(opt.extra_price) || 0), 0) || 0;
        return sum + itemBase + extras;
      }, 0);
      

    return (
        <div className="container mt-4">
            <Link to="/" className="btn btn-link mb-3">Back to Products</Link>
            <h2 className="mb-4">Your Cart</h2>

            {cart.map((item, index) => (
                <div key={index} className="card mb-3 p-3">
                    <h4 className='text-capitalize'>{item.productName}</h4>
                    <p>Price: €{item.price}</p>
                    <ul>
                        {item.options.map((opt, idx) => (
                            <li key={idx}>
                                {opt.category}: {opt.name}

                            </li>
                        ))}
                    </ul>
                    <button
                        className="btn btn-danger btn-sm mt-2"
                        onClick={() => removeFromCart(item.id)}
                    >
                        Remove
                    </button>
                </div>
            ))}
           <h4 className="mt-4">Total: €{total.toFixed(2)}</h4>
        </div>
    );
};

export default CartPage;
