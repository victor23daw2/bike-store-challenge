import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
