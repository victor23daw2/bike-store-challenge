import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Panel</h2>

      <div className="d-grid gap-3">
        <Link to="/admin/products" className="btn btn-outline-primary btn-lg">
          Manage Products
        </Link>
        <Link to="/admin/options" className="btn btn-outline-secondary btn-lg">
          Manage Options
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
