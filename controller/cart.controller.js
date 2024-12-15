// import Cart from '../model/Cart.js';
// import CartItems from '../model/cart-items.js';
// import Product from '../model/Product.js';
import { Cart, CartItems, Product } from '../model/association.js';

export const addToCart = async (request, response, next) => {
  const { adminId, productId } = request.body;

  try {
    let cart = await Cart.findOne({ where: { adminId } });

    if (!cart) {
      cart = await Cart.create({ adminId });
    }
    let cartId = cart.cart_id;

    const cartItem = await CartItems.findOne({
      where: { cartId, productId },
    });
    // console.log(`${adminId}, ${cartId}, ${productId}`);
    if (cartItem) {
      return response.status(400).send('Item already exists in the cart');
    }

    try {
      let result = await CartItems.create({ cartId, productId });
    } catch (err) {
      console.error('Error creating CartItem:', err);
      return response.status(500).send(`An error occurred: ${err.message}`);
    }
    return response.send('Item added to the cart successfully');
  } catch (err) {
    console.error(err);
    return response.status(500).send(`An error occurred: ${err.message}`);
  }
};

export const viewCart = async (request, response, next) => {
  let adminId = request.params.adminId;

  try {
    let cart = await Cart.findOne({ where: { adminId } });
    let cartId = cart.cart_id;

    if (cart) {
      let result = await CartItems.findAll({
        where: { cartId },
        include: [
          {
            model: Product,
            attributes: ['p_id', 'title'],
          },
        ],
      });

      if (result.length === 0) {
        response.send('Cart is empty');
      }
      const productDetails = result.map((item) => ({
        title: item.Product.title,
        productId: item.Product.p_id
      }));

      return response.json(productDetails);
    } else {
      response.json({ message: "Cart doesn't exist" });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteCartItem = async (request, response, next) => {
  let adminId = request.param.adminId;
    let productId = request.params.productId;

    try{

      let cart = await Cart.findOne({ where: { adminId } });
      let cartId = cart.cart_id;

      
    } catch(err){
      response.send(err);
    }





};
