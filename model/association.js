import CartItems from './Cart-items.js';
import Cart from './Cart.js';
import sequelize from '../db/dbConfig.js';
import Category from './Category.js';
import Product from './Product.js';
import Admin from './Admin.js';

console.log('Association Executed........');

Category.hasMany(Product, { 
  foreignKey: 'categoryId',
  onDelete: 'CASCADE',  
  onUpdate: 'CASCADE'   
});

Product.belongsTo(Category, { 
  foreignKey: 'categoryId',
  onDelete: 'CASCADE',  
  onUpdate: 'CASCADE'   
});

Admin.hasOne(Cart, { 
  foreignKey: 'adminId',
  onDelete: 'CASCADE',  
  onUpdate: 'CASCADE'   
});

Cart.belongsTo(Admin, { 
  foreignKey: 'adminId',
  onDelete: 'CASCADE',  
  onUpdate: 'CASCADE'  
});


CartItems.belongsTo(Product, {
  foreignKey: 'productId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

CartItems.belongsTo(Cart, {
  foreignKey: 'cartId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});


Cart.belongsToMany(Product, { 
  through: CartItems, 
  foreignKey: 'cartId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'   
});

Product.belongsToMany(Cart, { 
  through: CartItems, 
  foreignKey: 'productId',
  onDelete: 'CASCADE',  
  onUpdate: 'CASCADE'   
});

export { sequelize, Product, Cart, CartItems, Category, Admin };
