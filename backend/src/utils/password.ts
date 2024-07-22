import jwt from "jsonwebtoken";

export const generateToken = (userId: any) => {
  const jwtSecret = process.env.JSON_WEB_TOKEN ;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET environment variable is not defined.");
  }
  return jwt.sign({ id: userId }, jwtSecret, {
    expiresIn: "1h",
  });
};

