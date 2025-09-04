const Compte = require("../models/Compte");
// Récupérer tous les comptes
exports.getAllComptes = async (req, res) => {
  try {
    const comptes = await Compte.find();
    res
      .status(200)
      .json({ message: "Comptes retrieved successfully", data: comptes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create account
exports.createAccount = async (req, res) => {
  const { numero, typeCompte, solde, devise, image } = req.body;
  const compteExist = await Compte.findOne({ numero }); //vérifier si le compte existe déjà
  if (compteExist) {
    return res.status(400).json({ message: "Account number already exists" });
  }
  const newCompte = new Compte({
    numero,
    typeCompte,
    solde,
    devise,
    image,
  });
  try {
    const savedCompte = await newCompte.save();
    res
      .status(201)
      .json({ message: "Account created successfully", data: savedCompte });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get account by numero
exports.getAccountByNumber = async (req, res) => {
  const accountNumber = req.params.numero;
  try {
    const compte = await Compte.findOne({ numero: accountNumber });
    if (!compte) {
      return res.status(404).json({ message: "Account not found", data: null });
    }
    res
      .status(200)
      .json({ message: "Account retrieved successfully", data: compte });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete account by numero
exports.deleteAccountByNumber = async (req, res) => {
  const accountNumber = req.params.numero;
  try {
    const deletedCompte = await Compte.findOneAndDelete({
      numero: accountNumber,
    });
    if (!deletedCompte) {
      return res.status(404).json({ message: "Account not found", data: null });
    }
    res
      .status(200)
      .json({ message: "Account deleted successfully", data: deletedCompte });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//crediter account by numero
exports.creditAccountByNumber = async (req, res) => {
  const accountNumber = req.params.numero;
  const amount = parseFloat(req.params.amount);
  if (amount <= 0) {
    return res.status(400).json({ message: "Amount must be positive" });
  }
  try {
    const compte = await Compte.findOne({ numero: accountNumber });
    if (!compte) {
      return res.status(404).json({ message: "Account not found", data: null });
    }
    compte.solde += amount;
    const updatedCompte = await compte.save();
    res
      .status(200)
      .json({ message: "Account credited successfully", data: updatedCompte });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//debiter account by numero
exports.debitAccountByNumber = async (req, res) => {
  const accountNumber = req.params.numero;
  const amount = parseFloat(req.params.amount);
  if (amount <= 0) {
    return res.status(400).json({ message: "Amount must be positive" });
  }
  try {
    const compte = await Compte.findOne({ numero: accountNumber });
    if (!compte) {
      return res.status(404).json({ message: "Account not found", data: null });
    }
    if (compte.solde < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }
    compte.solde -= amount;
    const updatedCompte = await compte.save();
    res
      .status(200)
      .json({ message: "Account debited successfully", data: updatedCompte });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
