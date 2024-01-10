import { Order } from "../model/orderModel.js";

export const createOrder = async (data) => {
  try {
    const { userId, cart, address } = data;
    const order = new Order({
      userId: userId,
      product: cart.products,
      totalPrice: cart.total,
      payment: "cash-on-delevery",
      status: "confirmed",
      address: address,
    });

    await order.save();

    console.log(
      "--------------order------------",
      order,
      "----------order-----------"
    );
  } catch (error) {
    console.log("Error in order service in consumer funtion", error);
  }
};
