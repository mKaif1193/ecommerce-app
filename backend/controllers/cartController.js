import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "Please Login first",
      });
    }

    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    const updatedUserCart = await userModel.findByIdAndUpdate(userId, {
      cartData,
    });

    if (!updatedUserCart) {
      return res.json({
        success: false,
        message: "Error while adding cart item",
      });
    }

    res.json({
      success: true,
      message: "Added to Cart successfully",
    });
  } catch (error) {
    console.log("Error while adding cart item : ", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "Please Login first",
      });
    }

    let cartData = await userData.cartData;
    cartData[itemId][size] = quantity;

    const updatedUserCart = await userModel.findByIdAndUpdate(userId, {
      cartData,
    });

    if (!updatedUserCart) {
      return res.json({
        success: false,
        message: "Error while updating cart item",
      });
    }

    res.json({
      success: true,
      message: "Cart updated successfully",
    });
  } catch (error) {
    console.log("Error while updating cart item : ", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({
        success: false,
        message: "Please Login first",
      });
    }

    const cartData = await userData.cartData;

    res.json({
      cartData,
      success: true,
      message: "Get item successfully",
    });
  } catch (error) {
    console.log("Error while getting cart item : ", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { addToCart, updateCart, getUserCart };
