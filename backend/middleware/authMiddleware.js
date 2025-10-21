import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ success: false, message: "Not authorized, Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json({
        success: false,
        message: "Token verification failed, Login Again",
      });
    }
    req.id = decoded.id;
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
