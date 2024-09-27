import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const currency = "usd";
const deliveryCharges = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrderUsingCOD = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await orderModel.create(orderData);

    if (!newOrder) {
      return res.json({
        success: false,
        message: "Failed to place order using COD",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    res.json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log("Error while placing order using COD : ", error.message);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderUsingStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = await orderModel.create(orderData);

    if (!newOrder) {
      return res.json({
        success: false,
        message: "Failed to place order using Stripe",
      });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({
      session_url: session.url,
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log("Error while placing order using Stripe : ", error.message);
    res.json({ success: false, message: error.message });
  }
};

const verifyStripePayment = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body;

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true, message: "Payment verify successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log("Error while verifying Stripe payment : ", error.message);
    res.json({ success: false, message: error.message });
  }
};

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();

    res.json({
      orders,
      success: true,
      message: "Get all orders successfully",
    });
  } catch (error) {
    console.log("Error while getting all orders : ", error.message);
    res.json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });

    res.json({
      orders,
      success: true,
      message: "Get orders successfully",
    });
  } catch (error) {
    console.log("Error while getting user orders : ", error.message);
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.log("Error while updating order status : ", error.message);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrderUsingCOD,
  placeOrderUsingStripe,
  verifyStripePayment,
  allOrders,
  userOrders,
  updateStatus,
};
