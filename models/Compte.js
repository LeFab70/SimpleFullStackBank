const {Schema, model} = require('mongoose');
const compteSchema = new Schema({
    numero: {
        type: String,
        required: true,
        unique: true,
        match: /^C-\d{4}$/, // ex: C-0001 limite le format de numero compte
      },
      typeCompte: {
        type: String,
        enum: ["Cheque", "Epargne", "CELI"], 
        required: true,
      },
      solde: {
        type: Number,
        required: true,
        min: 0,
      },
      devise: {
        type: String,
        enum: ["CAD", "USD", "EUR"],
        required: true,
      },
      image: {
        type: String,
      }, 
});
const Compte = model('Compte', compteSchema);
module.exports = Compte;