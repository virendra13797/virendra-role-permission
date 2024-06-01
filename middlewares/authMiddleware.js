import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      msg: "JWT token is required for authentication",
    });
  }

  try {
    let bearerToken;
    if (token.startsWith("Bearer ")) {
      // Remove 'Bearer ' from the token string
      bearerToken = token.slice(7, token.length).trimLeft();
    } else {
      bearerToken = token;
    }

    const decodeToken = jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.user = decodeToken.user;
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: "Error: invalid token",
    });
  }

  return next();
};

export { verifyToken };
