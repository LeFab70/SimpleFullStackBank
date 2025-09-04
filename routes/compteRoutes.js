const express = require("express");
const router = express.Router();
const compteController = require("../controllers/compteControllers");
// Route pour récupérer tous les comptes
router.get("/getAllAccounts", compteController.getAllComptes);
// Route pour créer un nouveau compte
router.post("/createAccount", compteController.createAccount);

// Route pour récupérer un compte par son numéro
router.get("/getAccount/:numero", compteController.getAccountByNumber);

// Route pour supprimer un compte par son numéro
router.delete("/closeAccount/:numero", compteController.deleteAccountByNumber);

// Route pour mettre à jour le solde d'un compte crediter
router.put("/crediterAccount/:numero/:amount", compteController.creditAccountByNumber);
// Route pour mettre à jour le solde d'un compte debiter
router.put("/debiterAccount/:numero/:amount", compteController.debitAccountByNumber);
module.exports = router;
