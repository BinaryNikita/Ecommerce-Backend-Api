import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    slug: { type: String },
    name: { type: String },
    url: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
