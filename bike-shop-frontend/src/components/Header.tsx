import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-light bg-light px-4">
      <span className="navbar-brand mb-0 h1">Marcus Bike's</span>
      <Link to="/cart" className="btn btn-outline-primary">
      🛒 Cart
      </Link>
    </nav>
  );
};

export default Header;
