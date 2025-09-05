import {
  buscarUsuarioPorId,
  listar,
  login,
  registrar,
} from "../services/userService.js";

export const registrarUsuario = async (req, res) => {
  try {
    const user = await registrar(req.body);
    res.status(201).json({ msg: "Usuario registrado correctamente", user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const loguearUsuario = async (req, res) => {
  try {
    const { user, token } = await login(req.body);
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const listarUsuarios = (req, res) => {
  const listaDeUsuarios = listar();

  const usuariosSafe = listaDeUsuarios.map((usuario) => ({
    id: usuario.id,
    name: usuario.name,
    username: usuario.username,
  }));

  res.json(usuariosSafe);
};

export const usuarioPorId = (req, res) => {
  const usuario = buscarUsuarioPorId(req.params.id);
  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  const usuarioResponse = {
    name: usuario.name,
    username: usuario.username,
  };

  res.json(usuarioResponse);
};
