/*
***********************************
              With MongoDb 
***************** *******************
*/ 

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
//routes de compte
const compteRoutes = require('./routes/compteRoutes');
app.use(bodyParser.json());
app.use(cors());
//app.use(express.json());
const mongoose= require("mongoose");
mongoose
      .connect("mongodb://localhost:27017/Banque", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to MongoDB database"))
      .catch((err) => console.error("Could not connect to MongoDB...", err));

// app.get("/", (req, res) => {
//   res.send("Hello express");
// });

//routes
app.use('/api/comptes', compteRoutes);

app.listen(port, () => {
  console.log(`🚀 app started on http://localhost:${port}`);
});


/*
***********************************
              With Mysql 
***************** *******************
*/ 
// const express = require("express");
// const app = express();
// const port = 3000;
// const cors = require("cors");
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(cors());

// const mysql = require("mysql2");
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root123@@",
//   database: "Banque",
// });
// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to MySQL database");
// });

// app.get("/", (req, res) => {
//   res.send("Hello express");
// });

// //Get all Accounts
// app.get("/getAllAccounts", (req, res) => {
//   //Injection SQL ?
//   connection.query("SELECT * FROM Compte", (err, results) => {
//     if (err) throw err;
//     console.log(JSON.stringify(results));
//     res.status(200).json({
//       message: "Account retrieved successfully",
//       data: results,
//     });
//   });
// });

// //Create account
// app.post("/createAccount", (req, res) => {
//   const { numero, typeCompte, solde, devise, image } = req.body;

//   // Vérifier si le compte existe déjà
//   const checkQuery = "SELECT * FROM Compte WHERE numero = ?";
//   connection.query(checkQuery, [numero], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Erreur serveur" });
//     }

//     if (results.length > 0) {
//       return res.status(409).json({ message: "Compte déjà créé" });
//     }
//     // Si le compte n'existe pas, on l'insère
//     const insertQuery =
//       "INSERT INTO Compte (numero, typeCompte, solde, devise, image) VALUES (?, ?, ?, ?, ?)";
//     connection.query(
//       insertQuery,
//       [numero, typeCompte, solde, devise, image],
//       (err, results) => {
//         if (err) {
//           console.error(err);
//           return res
//             .status(500)
//             .json({ message: "Erreur lors de la création du compte" });
//         }

//         res.status(201).json({
//           message: "Compte créé avec succès",
//           // data: results
//         });
//       }
//     );
//   });
// });

// // Get account by numero
// app.get("/getAccount/:numero", (req, res) => {
//   const accountNumber = req.params.numero;
//   connection.query(
//     "SELECT * FROM Compte WHERE numero = ?",
//     [accountNumber],
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         return res
//           .status(500)
//           .json({ message: "Erreur serveur lors de la requête." });
//       }

//       if (results.length === 0) {
//         return res.status(404).json({
//           message: "Account non trouvé.",
//           data: {
//             numero: null,
//             typeCompte: null,
//             solde: 0.0,
//             devise: null,
//             image: null,
//           },
//         });
//       }

//       console.log(JSON.stringify(results));
//       res.status(200).json({
//         message: "Account récupéré avec succès",
//         data: results[0],
//       });
//     }
//   );
// });

// //Crediter account
// app.put("/crediterAccount/:numero/:amount", (req, res) => {
//   const accountNumber = req.params.numero;
//   const amount = parseFloat(req.params.amount);
//   connection.query(
//     "UPDATE Compte SET solde = solde + ? WHERE numero = ?",
//     [amount, accountNumber],
//     (err, results) => {
//       if (err) throw err;
//       if (results.affectedRows === 0) {
//         return res.status(404).json({ message: "compte  non trouvé." });
//       }
//       console.log(JSON.stringify(results));
//       res.status(200).json({
//         message: `Dépôt de ${amount} effectué avec succès.`,
//         //data: results,
//       });
//     }
//   );
// });

// //debiter account
// app.put("/debiterAccount/:numero/:amount", (req, res) => {
//   const accountNumber = req.params.numero;
//   const amount = parseFloat(req.params.amount);
//   //check account balance
//   connection.query(
//     "SELECT solde FROM Compte WHERE numero = ?",
//     [accountNumber],
//     (err, results) => {
//       if (err) throw err;
//       // Si aucun compte trouvé
//       if (results.length === 0) {
//         return res.status(404).json({ message: "Compte non trouvé." });
//       }
//       const currentBalance = results[0].solde;
//       if (currentBalance < amount) {
//         return res.status(400).json({
//           message: `Fonds insuffisants. Solde actuel : ${currentBalance}`,
//         });
//       }

//       //  Débiter le compte if balance is sufficient
//       connection.query(
//         "UPDATE Compte SET solde = solde - ? WHERE numero = ?",
//         [amount, accountNumber],
//         (err, updateResults) => {
//           if (err) throw err;
//           res.status(200).json({
//             message: `Retrait de ${amount} effectué avec succès.`,
//           });
//         }
//       );
//     }
//   );
// });

// //Close account
// app.delete("/closeAccount/:numero", (req, res) => {
//   const accountNumber = req.params.numero;
//   connection.query(
//     "delete FROM Compte WHERE numero = ?",
//     [accountNumber],
//     (err, results) => {
//       if (err) {
//         console.error(err);
//         return res
//           .status(500)
//           .json({ message: "Erreur serveur lors de la requête." });
//       }

//       if (results.affectedRows === 0) {
//         return res.status(404).json({ message: "Account non trouvé." });
//       }

//       console.log(JSON.stringify(results));
//       res.status(200).json({
//         message: `Opération réussie - compte ${accountNumber} fermé avec succès`,
//       });
//     }
//   );
// });

// app.listen(port, () => {
//   console.log(`🚀 app started on http://localhost:${port}`);
// });



