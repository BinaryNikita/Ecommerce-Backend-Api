import Cart from '../model/Cart.js';
import CartItems from '../model/cart-items.js';
import Product from '../model/Product.js';

export const addToCart = async (request, response, next) => {
  const { adminId, productId } = request.body;

  try {
    let cart = await Cart.findOne({ adminId });

    if (!cart) {
      cart = await Cart.create({ adminId });
    }

    const cartId = cart._id;  


    let cartItem = await CartItems.findOne({ cartId, productId });

    if (cartItem) {
      return response.status(400).send('Item already exists in the cart');
    }


    await CartItems.create({ cartId, productId });
    return response.send('Item added to the cart successfully');
  } catch (err) {
    console.error(err);
    return response.status(500).send(`An error occurred: ${err.message}`);
  }
};

export const viewCart = async (request, response, next) => {
  const { adminId } = request.params;

  try {
    let cart = await Cart.findOne({ adminId });

    if (!cart) {
      return response.status(404).json({ message: "Cart doesn't exist" });
    }

    const cartId = cart._id;


    const cartItems = await CartItems.find({ cartId })
      .populate('productId', 'title price')  
      .exec();

    if (cartItems.length === 0) {
      return response.send('Cart is empty');
    }

    const productDetails = cartItems.map(item => ({
      title: item.productId.title,
      productId: item.productId._id,
      price: item.productId.price,
    }));

    return response.json(productDetails);
  } catch (err) {
    console.log(err);
    return response.status(500).send('Error fetching cart details');
  }
};

export const deleteCartItem = async (request, response, next) => {
  const { adminId, productId } = request.params;

  try {
    let cart = await Cart.findOne({ adminId });

    if (!cart) {
      return response.status(404).send("Cart doesn't exist");
    }

    const cartId = cart._id;


    await CartItems.deleteOne({ cartId, productId });

    return response.send('Item removed from your cart.');
  } catch (err) {
    return response.status(500).send('Error removing item from cart');
  }
};
