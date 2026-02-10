import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatters';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-secondary-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-secondary-900 mb-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-secondary-600 mb-2 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-accent-500">★</span>
              <span className="text-sm font-medium text-secondary-700">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-lg font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <div className="mt-2">
            <span className="inline-block text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
