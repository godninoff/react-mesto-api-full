import verify from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import Unauthorized from "../errors/Unauthorized.js";

const { NODE_ENV, JWT_SECRET } = process.env;

export default (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    throw new Unauthorized("Необходима авторизация");
  }

  req.user = payload;

  next();
};
