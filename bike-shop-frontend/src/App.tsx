import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Header from './components/Header';
import CartPage from './pages/CartPage';
import AdminProducts from './pages/AdminProducts';
import AdminOptions from './pages/AdminOptions';
import AdminHome from './pages/AdminHome';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/options" element={<AdminOptions />} />
          <Route path="/admin" element={<AdminHome />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
