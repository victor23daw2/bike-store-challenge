import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link to="/" className="btn-link">
      <span className="navbar-brand mb-0 h1">Marcus Bike's</span>
      </Link>
      <Link to="/admin" className="btn btn-outline-primary">
      👤 Admin
      </Link>
      <Link to="/cart" className="btn btn-outline-primary">
      🛒 Cart
      </Link>
    </nav>
  );
};

export default Header;
