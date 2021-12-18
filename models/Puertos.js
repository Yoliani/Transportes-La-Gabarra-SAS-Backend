const { Schema, model } = require('mongoose');

const validator = require('validator');
const PuertoSchema = Schema({
  origen: {
    type: String,
    require: true,
    validate: (value) => {
      const regexp =
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

      return regexp.test(value);
    },
  },

  destino: {
    type: String,
    require: true,
    validate: (value) => {
      const regexp =
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

      return regexp.test(value);
    },
  },

  distancia: {
    type: Number,
    require: true,
    validate: (value) => {
      const regexp = /^[0-9]*$/;

      return regexp.test(value);
    },
  },
});

module.exports = model('Puerto', PuertoSchema);
