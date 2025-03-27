import Header from './components/Header';
import ProductList from './pages/ProductList';

function App() {
  return (
    <>
      <Header />
      <div className="container mt-4">
        <ProductList />
      </div>
    </>
  );
}

export default App;
