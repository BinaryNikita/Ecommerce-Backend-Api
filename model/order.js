import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderStatus: { type: String, default: 'pending', required: true },
    totalAmount: { type: mongoose.Schema.Types.Decimal128, required: true },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
