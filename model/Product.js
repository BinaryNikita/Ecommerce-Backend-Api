import { DataTypes } from 'sequelize';
import sequelize from '../db/dbConfig.js';
import Category from './Category.js';
const Product = sequelize.define(
  'Product',
  {
    p_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull:false
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    warrantyInformation: {
      type: DataTypes.STRING,
    },
    shippingInformation: {
      type: DataTypes.STRING,
    },
    availabilityStatus: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

export default Product;
