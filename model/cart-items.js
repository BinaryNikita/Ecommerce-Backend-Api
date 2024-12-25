import mongoose from 'mongoose';
import Product from './Product.js';
import Cart from './Cart.js';

const cartItemSchema = new mongoose.Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const CartItems = mongoose.model('CartItems', cartItemSchema);

export default CartItems;
