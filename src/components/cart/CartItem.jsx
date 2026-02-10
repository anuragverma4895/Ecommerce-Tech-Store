import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      
      <div className="flex-grow">
        <h3 className="font-semibold text-secondary-900">{item.name}</h3>
        <p className="text-sm text-secondary-600">{formatPrice(item.price)}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border border-secondary-300 rounded">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="px-3 py-1 hover:bg-secondary-100"
          >
            -
          </button>
          <span className="px-4 py-1 border-x border-secondary-300">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
            className="px-3 py-1 hover:bg-secondary-100"
            disabled={item.quantity >= item.stock}
          >
            +
          </button>
        </div>

        <button
          onClick={() => removeFromCart(item._id)}
          className="text-red-600 hover:text-red-700 p-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="font-semibold text-primary-600 min-w-[100px] text-right">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default CartItem;
