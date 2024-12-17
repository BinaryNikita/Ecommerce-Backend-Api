import sequelize from "../db/dbConfig.js";
import { DataTypes } from "sequelize";

const Order = sequelize.define('Order', {
   
    order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
      orderStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending', 
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    
 
});

export default Order;