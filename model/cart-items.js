import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";

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
      model: 'carts', 
      key: 'cart_id', 
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products', 
      key: 'id', 
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});





export default CartItems;