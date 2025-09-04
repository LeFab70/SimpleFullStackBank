DROP DATABASE IF EXISTS Banque;
CREATE DATABASE IF NOT EXISTS Banque;
USE Banque;


CREATE TABLE Compte (
    numero CHAR(6) PRIMARY KEY,
    typeCompte VARCHAR(7) CHECK (typeCompte IN ('Cheque', 'Epargne', 'CELI')),
    solde DECIMAL(10,2),
    devise VARCHAR(3) CHECK (devise IN ('CAD', 'USD', 'EUR')),
    image VARCHAR(50)
);

-- Insertion des données initiales
INSERT INTO Compte (numero, typeCompte, solde, devise, image) VALUES
('C-0001', 'Cheque', 1000.00, 'CAD', 'Depense.jpg'),
('C-0002', 'Epargne', 2000.00, 'USD', 'Epargne.jpg'),
('C-0003', 'CELI',    3000.00, 'CAD', 'investissement.jpg'),
('C-0004', 'Epargne', 4000.00, 'EUR', 'Epargne.jpg'),
('C-0005', 'Cheque',  5000.00, 'CAD', 'Depense.jpg');
