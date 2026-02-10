import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="bg-secondary-50 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md bg-white p-8 rounded-lg shadow-sm">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-secondary-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-secondary-600 mb-8">
          Thank you for your order. You will receive a confirmation email shortly.
        </p>
        <Link
          to="/products"
          className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
