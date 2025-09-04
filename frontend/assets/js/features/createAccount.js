//save account

//console.info("createAccount.js loaded");
const URL_API = new URL("http://localhost:3000/api/comptes");

export const createAccount = async(accountObject) => {
 
  //console.info(accountObject)
  try {
    const response = await fetch(`${URL_API}/createAccount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountObject),
    });
    const result = await response.json();
    if (response.ok) {
      alert("Account created successfully!");
      return result;
      
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error creating account:", error);
    alert("An error occurred while creating the account.");
  }
}
