import { SECRET } from "../constants/constants.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];
  console.log("token", token);
  if (!token) return res.status(401).json({ error: "Token inválido" });

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("ERR", err)
    return res.status(403).json({ error: "Token no válido o expirado" });
  }
};
