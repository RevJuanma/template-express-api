import express from "express";
import {
  listarUsuarios,
  loguearUsuario,
  registrarUsuario,
  usuarioPorId,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", registrarUsuario);
userRoutes.post("/login", loguearUsuario);

userRoutes.use(authMiddleware);

// Rutas protegidas
userRoutes.get("/:id", usuarioPorId);
userRoutes.get("/", listarUsuarios);

export default userRoutes;
