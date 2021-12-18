const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(401).json({
        ok: false,
        msg: 'Un usuario ya existe con ese correo',
      });
    }

    usuario = new Usuario(req.body);

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //generar el JWT
    const token = await generarJWT(usuario.id, usuario.name);

    //status ok se guardo el usuario
    return res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      lastname: usuario.lastname,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'por favor hable con el Administrador',
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese Email',
      });
    }

    // Consfirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto',
      });
    }

    // generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    return res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
      tipousuario: usuario.tipousuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'por favor hable con el Administrador',
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uid, name } = req;

  //Generar un nuevo JWT y retornarlo en esta peticion
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
