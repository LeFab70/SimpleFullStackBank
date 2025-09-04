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
window.addEventListener("click", async () => {
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


