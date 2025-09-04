const mongoose = require('mongoose');
const Compte = require('../models/Compte');
mongoose.connect("mongodb://localhost:27017/Banque", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
   seedBd=async ()=>{
    try {
    await Compte.deleteMany({}); // Supprime tous les documents existants
    await Compte.insertMany([ // Insère des documents initiaux
        {
            numero: "C-0001",
            typeCompte: "Cheque",
            solde: 1000.0,
            devise: "CAD",
            image: "Depense.jpg",
          },
          {
            numero: "C-0002",
            typeCompte: "Epargne",
            solde: 2000.0,
            devise: "USD",
            image: "Epargne.jpg",
          },
          {
            numero: "C-0003",
            typeCompte: "CELI",
            solde: 3000.0,
            devise: "CAD",
            image: "investissement.jpg",
          },
          {
            numero: "C-0004",
            typeCompte: "Epargne",
            solde: 4000.0,
            devise: "EUR",
            image: "Epargne.jpg",
          },
          {
            numero: "C-0005",
            typeCompte: "Cheque",
            solde: 5000.0,
            devise: "CAD",
            image: "Depense.jpg",
          }
    ]);
    console.log("Database seeded with initial accounts.");
    mongoose.connection.close();

   }
   catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
    }
}
seedBd(); // Appel de la fonction pour semer la base de données mongo