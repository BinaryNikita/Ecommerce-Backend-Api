import mongoose from 'mongoose';
import Product from './Product.js';
import Order from './Order.js';

const orderItemSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { type: Number, default: 1, required: true },
    price: { type: mongoose.Schema.Types.Decimal128, required: true },
  },
  { timestamps: true }
);

const OrderItems = mongoose.model('OrderItems', orderItemSchema);
console.log(orderItemSchema);

export default OrderItems;
