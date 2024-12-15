import Cart from '../model/Cart.js';
import CartItems from '../model/cart-items.js';

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
console.log(`${adminId}, ${cartId}, ${productId}`);
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
