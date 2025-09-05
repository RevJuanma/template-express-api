import express from "express";
import {
  listarUsuarios,
  loguearUsuario,
  registrarUsuario,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.get("/", authMiddleware, listarUsuarios);

userRoutes.post("/register", registrarUsuario);
userRoutes.post("/login", loguearUsuario);

export default userRoutes;
