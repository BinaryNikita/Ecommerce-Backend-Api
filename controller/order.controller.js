import Order from '../model/Order.js';
import OrderItems from '../model/OrderItems.js';
import Product from '../model/Product.js';

export const placeOrder = async (request, response, next) => {
  const { adminId, productId, quantity } = request.body;

  try {
    let product = await Product.findOne({ _id: productId });

    if (!product) {
      return response.status(404).send("Product doesn't exist");
    }

    const price = product.price;
    const productName = product.title;
    const totalAmount = price * quantity;

    const order = await Order.create({ adminId, totalAmount });

    await OrderItems.create({ orderId: order._id, productId, quantity, price });

    response.status(200).send(`Order placed successfully for ${productName}`);
  } catch (err) {
    console.error(err);
    response.status(500).send('Error placing order');
  }
};

export const orderHistory = async (request, response, next) => {
  const { adminId } = request.params;

  try {
    let orders = await Order.find({ adminId }).populate('adminId', 'name');

    if (orders.length === 0) {
      return response.status(404).send('No orders found for this admin.');
    }

    let orderHistory = [];

    for (let order of orders) {
      let items = await OrderItems.find({ orderId: order._id }).populate(
        'productId',
        'title price'
      );

      orderHistory.push({
        orderId: order._id,
        orderStatus: order.orderStatus,
        totalAmount: order.totalAmount,
        items: items.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: item.price,
        })),
      });
    }

    response.status(200).json(orderHistory);
  } catch (err) {
    console.error(err);
    response.status(500).send('Error fetching order history');
  }
};

export const cancelOrder = async (request, response, next) => {
  const { orderId } = request.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return response.status(404).send('Order not found');
    }

    if (order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered') {
      return response
        .status(400)
        .send('Cannot cancel a shipped or delivered order');
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    return response.status(200).send('Order cancelled successfully');
  } catch (err) {
    console.error(err);
    return response.status(500).send('Error cancelling order');
  }
};
