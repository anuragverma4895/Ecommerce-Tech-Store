import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { formatPrice } from '../../utils/formatters';
import Button from '../common/Button';

const CartSummary = () => {
  const { cart, getCartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? (subtotal > 5000 ? 0 : 100) : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-secondary-700">
          <span>Subtotal ({cart.length} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-secondary-700">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
        </div>
        {subtotal > 0 && subtotal <= 5000 && (
          <p className="text-xs text-accent-600">
            Add {formatPrice(5000 - subtotal)} more for free shipping!
          </p>
        )}
      </div>

      <div className="border-t pt-3 mb-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span className="text-primary-600">{formatPrice(total)}</span>
        </div>
      </div>

      <Button
        fullWidth
        disabled={cart.length === 0}
        onClick={handleCheckout}
      >
        {user ? 'Proceed to Checkout' : 'Login to Checkout'}
      </Button>
    </div>
  );
};

export default CartSummary;
