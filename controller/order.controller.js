import { Order, OrderItems, CartItems, Product } from '../model/association.js';

export const placeOrder = async (request, response, next) => {
  let { adminId, productId, quantity } = request.body;

  try {
    let product = await Product.findOne({ where: { p_id: productId } });

    if (!product) {
      return response.status(404).end("Product doesn't exist");
    }

    let price = product.price;
    let productName = product.title;
    let totalAmount = price * quantity;

    let order = await Order.create({ adminId, totalAmount });
    let orderId = order.order_id;

    await OrderItems.create({ orderId, productId, quantity, price });

    response.status(200).send(`Order placed successfully for ${productName}`);
  } catch (err) {
    console.error('Error placing order:', err);
    response.status(500).send('An error occurred while placing the order.');
  }
};

export const orderHistory = async (request, response, next) => {
  let adminId = request.params.adminId;

  try {
    let orders = await Order.findAll({ where: { adminId } });

    if (orders.length === 0) {
      return response.status(404).send('No orders found for this admin.');
    }

    let orderHistory = [];

    for (let order of orders) {
      let items = await OrderItems.findAll({
        where: { orderId: order.order_id },
      });

      orderHistory.push({
        orderId: order.order_id,
        orderStatus: order.orderStatus,
        totalAmount: order.totalAmount,
        items: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      });
    }

    response.status(200).json(orderHistory);
  } catch (err) {
    console.error('Error fetching order history:', err);
    response
      .status(500)
      .send('An error occurred while fetching order history.');
  }
};
