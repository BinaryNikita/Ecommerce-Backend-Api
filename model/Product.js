import mongoose from 'mongoose';
import Category from './Category.js';

const productSchema = new mongoose.Schema(
  {
    title: { type: String },
    price: { type: mongoose.Schema.Types.Decimal128 },
    stock: { type: Number, min: 0 },
    reviews: [
      {
        rating: { type: Number },
        comment: { type: String },
      },
    ],
    warrantyInformation: { type: String },
    shippingInformation: { type: String },
    availabilityStatus: { type: String, default: 'In Stock' },
    thumbnail: { type: String, default: 'default-thumbnail.jpg' },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
