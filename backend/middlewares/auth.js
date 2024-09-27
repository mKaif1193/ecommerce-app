import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized. Please Login Again",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.json({
        success: false,
        message: "Unauthorized. Please Login Again",
      });
    }

    req.body.userId = decodedToken.id;
    next();
  } catch (error) {
    console.log("Error while verifying user token : ", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;
