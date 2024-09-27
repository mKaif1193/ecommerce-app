import express from "express";
import {
  placeOrderUsingCOD,
  placeOrderUsingStripe,
  verifyStripePayment,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middlewares/adminAuth.js";
import userAuth from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

orderRouter.post("/place", userAuth, placeOrderUsingCOD);

orderRouter.post("/stripe", userAuth, placeOrderUsingStripe);
orderRouter.post("/verifystripe", userAuth, verifyStripePayment);

orderRouter.post("/userorders", userAuth, userOrders);

export default orderRouter;
