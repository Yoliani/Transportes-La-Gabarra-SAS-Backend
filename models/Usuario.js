const { Schema, model } = require('mongoose');

const validator = require('validator');
const UsuarioSchema = Schema({
  name: {
    type: String,
    require: true,
    validate: (value) => {
      const regexp =
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

      return regexp.test(value);
    },
  },

  lastname: {
    type: String,
    require: true,
    validate: (value) => {
      const regexp =
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

      return regexp.test(value);
    },
  },

  email: {
    type: String,
    require: true,
    unique: true,
    validate: (value) => validator.isEmail(value),
  },
  password: {
    type: String,
    require: true,
  },
  tipousuario: {
    type: String,
    require: true,
  },
});

module.exports = model('Usuario', UsuarioSchema);
