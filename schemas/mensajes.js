const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mensajeSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    mensaje: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

let Mensaje = mongoose.model("mensajes", mensajeSchema);

module.exports = Mensaje;
