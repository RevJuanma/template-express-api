import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET } from "../constants/constants.js";

const users = [];

export const registrar = async ({ username, password }) => {
  //FIND
  const usuarioExistente = users.find((user) => user.username === username);
  if (usuarioExistente) throw new Error("El usuario ya existe");

  const hashedPassword = await bcrypt.hash(password, 10);

  // CREATE
  const newUser = { id: username, username, password: hashedPassword };
  users.push(newUser);

  return { newUser };
};

export const login = async ({ username, password }) => {
  const user = users.find((u) => u.username === username);
  if (!user) throw new Error("Usuario no encontrado");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Usuario y/o Contraseña incorrectos");

  const token = jwt.sign({ username: user.username }, SECRET, {
    expiresIn: "1h",
  });

  return { user: { username: user.username }, token };
};

export const listar = () => {
  console.log(users)
  return { usuarios: users.map((u) => ({ username: u.username })) };
};
