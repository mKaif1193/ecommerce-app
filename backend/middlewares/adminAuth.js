import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized. Please Login Again",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Unauthorized. Please Login Again",
      });
    }

    next();
  } catch (error) {
    console.log("Error while verifying admin token : ", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default adminAuth;
