import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";
import Product from "./Product.js";
import Cart from "./Cart.js";

const CartItems = sequelize.define("CartItems", {
  cartItem_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Cart', 
      key: 'cart_id', 
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Product', 
      key: 'p_id', 
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});





export default CartItems;