import { serviceToProducer } from "../kafka/serviceToProducer.js";
import { Cart } from "../model/cartModel.js";
export const firstrequest = async (req, res) => {
  try {
    res.status(200).json("hi");
  } catch (error) {
    res
      .status(400)
      .json("Error happence in cart-service in fistrequst " + error);
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      res.status(400).json("No cart found from this user");
    } else {
      res.status(200).json(cart);
    }
  } catch (error) {
    res.status(400).json("Error happence in cart-service in getcart ", error);
  }
};

export const deleteCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      res.status(400).json("No cart found in this user ");
    }
    console.log(cart);
    cart.products = [];
    cart.total = 0;

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(400)
      .json("Error happence in cart-service in deleteCart ", error);
  }
};

export const deletItemCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      res.status(400).json("No cart found in this user ");
    }
    const productIdnex = cart.products.findIndex(
      (item) => item.productId == productId
    );

    if (productIdnex == -1) {
      res.status(400).json("Product is no in this cart");
    }
    cart.products.splice(productIdnex, 1);

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res
      .status(400)
      .json("Error happence in cart-service in deleteCart ", error);
  }
};
