//save account

//console.info("createAccount.js loaded");
import { URL_API } from "./url.js";

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

//with xmlhttprequest
export const createAccountXML = (accountObject) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${URL_API}/createAccount`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const result = JSON.parse(xhr.responseText);
        alert("Account created successfully!");
        resolve(result);
      } else {
        const error = JSON.parse(xhr.responseText);
        alert(`Error: ${error.message}`);
        reject(error);
      }
    };

    xhr.onerror = () => {
      alert("An error occurred while creating the account.");
      reject(new Error("Network error"));
    };

    xhr.send(JSON.stringify(accountObject));
  });
};
//end with xmlhttprequest