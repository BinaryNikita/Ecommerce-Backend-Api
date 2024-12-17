import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";
import Order from "./order.js";
import Product from "./Product.js";

const OrderItems = sequelize.define('OrderItems', {
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: 'order_id',
      },
      onDelete: 'CASCADE',
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: 'p_id',
      },
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

 
  
  export default OrderItems;
  