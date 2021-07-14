const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 20 },
  age: { type: Number, min: 0, max: 30 },
  color: { type: String, default: "black" },
  favoriteToys: [String],
  sex: { type: String, enum: ["male", "female"] },
});

// O primeiro argumento de model determinar o nome da coleção que será criada no banco, mas o Mongoose automaticamente transforma a palavra em minúsculas e no plural. Ou seja, o modelo chamado 'Cat' gera uma coleção chamada 'cats'
module.exports = mongoose.model("Cat", CatSchema);
