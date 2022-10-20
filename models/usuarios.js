const mongoose = require("mongoose");
const UsuarioSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
  },
  { versionKey: false }
);

const Usuarios = mongoose.model("usuarios", UsuarioSchema);
module.exports = Usuarios;
