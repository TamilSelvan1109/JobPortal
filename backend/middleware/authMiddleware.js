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
<<<<<<< HEAD
<<<<<<< HEAD
    req.id = decoded.userId;
=======
    req.id = decoded.id;
>>>>>>> 0391c8a (user and company register done)
=======
    req.id = decoded.id;
>>>>>>> 0391c8a660681a763f3c968e01f170e4dd1d4420
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
