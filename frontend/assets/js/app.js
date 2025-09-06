//init display options
const module = await import("./features/index.js");
module.initZoneDisplay();

//create account form submission
const saveAccountForm = document.getElementById("saveAccountForm");
saveAccountForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(saveAccountForm);
  const accountObject = Object.fromEntries(formData.entries());
  if (formData.get("image")) {
    accountObject.image = formData.get("image").name;
  }
  //console.info(accountObject);
  const module = await import("./features/index.js");
  await module.createAccount(accountObject);
  saveAccountForm.reset();
});

//load all accounts
const idCorpsTableau = document.getElementById("idCorpsTableau");
const listAccount = document.getElementById("listAccount");
listAccount.addEventListener("click", async () => {
  const module = await import("./features/index.js");
  const comptes = await module.getAllAccounts();
  console.info(comptes);
  if (comptes.length === 0) {
    idCorpsTableau.innerHTML = `<tr><td colspan="6">No accounts found.</td></tr>`;
  } else {
    idCorpsTableau.innerHTML = "";
    comptes.data.forEach((compte) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${compte.numero}</td>
        <td>${compte.typeCompte}</td>
        <td>${compte.solde}</td>
        <td>${compte.devise}</td>
        <td><img src="./img/${compte.image}" alt="${compte.image}" width="50"></td>
      `;
      idCorpsTableau.append(row);
    });
  }
});

//delete account form submission

const numberAccountToDelete = document.getElementById("txtIdS");
const deleteAccountBtn = document.getElementById("deleteAccount");
const searchAccountToDelete = document.getElementById("searchAccountToDelete");
deleteAccountBtn.addEventListener("click", async () => {
  const accountNumber = numberAccountToDelete.value.trim();
  if (!accountNumber) {
    alert("Please enter an account number.");
    return;
  }
  const module = await import("./features/index.js");
  const compte = await module.deleteAccount(accountNumber);
  if (compte) {
    alert("Account deleted successfully!");
    deleteAccountBtn.disabled = true;
    document.getElementById("txtDescriptionS").value = "";
    document.getElementById("txtPrixS").value = "";
    document.getElementById("txtImageS").value = "";
    document.getElementById("txtDetailS").value = "";
    numberAccountToDelete.value = "";
  }
});

//search account from number
//const accountNumberInput = document.getElementById("txtIdS");
searchAccountToDelete.addEventListener("click", async () => {
  const accountNumber = numberAccountToDelete.value.trim();
  if (!accountNumber) {
    alert("Please enter an account number.");
    return;
  }
  const module = await import("./features/index.js");
  const compte = await module.searchAccount(accountNumber);
  if (compte) {
    deleteAccountBtn.disabled = false;
    document.getElementById("txtDescriptionS").value = compte.data.typeCompte;
    document.getElementById("txtPrixS").value = compte.data.solde;
    document.getElementById("txtImageS").value = compte.data.image;
    document.getElementById("txtDetailS").value = compte.data.devise;
  } else {
    deleteAccountBtn.disabled = true;
    alert("Account not found.");
    document.getElementById("txtDescriptionS").value = "";
    document.getElementById("txtPrixS").value = "";
    document.getElementById("txtImageS").value = "";
    document.getElementById("txtDetailS").value = "";
  }
});


//credit and debit account form submission
const txtIdM = document.getElementById("txtIdM");
const txtPrixM = document.getElementById("txtPrixM");
const searchAccountToModified = document.getElementById("searchAccountToModified");
const creditAccount= document.getElementById("creditAccount");
const debitAccount= document.getElementById("debitAccount");
let soldeInitial=0;
//search account from number
//const accountNumberInput = document.getElementById("txtIdS");
searchAccountToModified.addEventListener("click", async () => {
  const accountNumber = txtIdM.value.trim();
  if (!accountNumber) {
    alert("Please enter an account number.");
    return;
  }
  const module = await import("./features/index.js");
  const compte = await module.searchAccount(accountNumber);
  if (compte) {
    creditAccount.disabled = false;
    debitAccount.disabled = false;
    document.getElementById("txtDescriptionM").value = compte.data.typeCompte;
    document.getElementById("txtPrixM").value = compte.data.solde;
    soldeInitial = compte.data.solde;
    document.getElementById("txtImageM").value = compte.data.image;
    document.getElementById("txtDetailM").value = compte.data.devise;
  } else {
    creditAccount.disabled = true;
    debitAccount.disabled = true;
    alert("Account not found.");
    document.getElementById("txtDescriptionM").value = "";
    document.getElementById("txtPrixM").value = "";
    document.getElementById("txtImageM").value = "";
    document.getElementById("txtDetailM").value = "";
  }
});
//credit account
creditAccount.addEventListener("click", async () => {
  const accountNumber = txtIdM.value.trim();
  const amount = parseFloat(txtPrixM.value);
  if (!accountNumber || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid account number and amount.");
    return;
  }
  const module = await import("./features/index.js");
  const compte = await module.crediterAccount(accountNumber, amount);
  if (compte) {
    alert("Account credited successfully!");
    creditAccount.disabled = true;
    debitAccount.disabled = true;
    document.getElementById("txtDescriptionM").value = "";
    document.getElementById("txtPrixM").value = "";
    document.getElementById("txtImageM").value = "";
    document.getElementById("txtDetailM").value = "";
    txtIdM.value = "";
  }
});
//debit account
debitAccount.addEventListener("click", async () => {
  const accountNumber = txtIdM.value.trim();
  const amount = parseFloat(txtPrixM.value);
  if (!accountNumber || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid account number and amount.");
    return;
  }
  if (amount > parseFloat(soldeInitial)) {
    alert(`Insufficient balance. just ${soldeInitial} available.`);
    return;
  }
  const module = await import("./features/index.js");
  const compte = await module.debiterAccount(accountNumber, amount);
  if (compte) {
    alert("Account debited successfully!");
    creditAccount.disabled = true;
    debitAccount.disabled = true;
    document.getElementById("txtDescriptionM").value = "";
    document.getElementById("txtPrixM").value = "";
    document.getElementById("txtImageM").value = "";
    document.getElementById("txtDetailM").value = "";
    txtIdM.value = "";
  }
});