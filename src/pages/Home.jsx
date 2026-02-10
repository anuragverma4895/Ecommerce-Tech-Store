import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts } from '../services/productService';
import ProductGrid from '../components/product/ProductGrid';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFeaturedProducts();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Tech Products for Modern Life
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Discover the latest in technology. From earbuds to laptops, we've got you covered.
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {['Earbuds', 'Headphones', 'Laptops', 'Phones', 'Smartwatches'].map((category) => (
              <Link
                key={category}
                to={`/products?category=${category.toLowerCase()}`}
                className="bg-secondary-50 hover:bg-secondary-100 p-6 rounded-lg text-center transition-colors"
              >
                <div className="text-4xl mb-2">
                  {category === 'Earbuds' && '🎧'}
                  {category === 'Headphones' && '🎧'}
                  {category === 'Laptops' && '💻'}
                  {category === 'Phones' && '📱'}
                  {category === 'Smartwatches' && '⌚'}
                </div>
                <h3 className="font-semibold text-secondary-900">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium">
              View All →
            </Link>
          </div>
          
          {loading && <Loader />}
          {error && <ErrorMessage message={error} onRetry={loadFeaturedProducts} />}
          {!loading && !error && <ProductGrid products={products} />}
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-secondary-600">On orders above ₹5,000</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-secondary-600">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-semibold text-lg mb-2">Quality Products</h3>
              <p className="text-secondary-600">Authentic and verified</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
