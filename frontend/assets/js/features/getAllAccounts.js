
import { URL_API } from "./url.js";
//console.info(URL_API);
//fetch all accounts
export const getAllAccounts = async () => {
  try {
    const response = await fetch(`${URL_API}/getAllAccounts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const comptes = await response.json();
    if (response.ok) {
      return comptes;
    } else {
     // alert(`Error: ${comptes.message}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching accounts:", error);
    //alert("An error occurred while fetching accounts.");
    return [];
  }
}

//with xmlhttprequest
export const getAllAccountsXML = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${URL_API}/getAllAccounts`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const comptes = JSON.parse(xhr.responseText);
        resolve(comptes);
      } else {
        const error = JSON.parse(xhr.responseText);
       // alert(`Error: ${error.message}`);
        reject(error);
      }
    };

    xhr.onerror = () => {
     // alert("An error occurred while fetching accounts.");
      reject(new Error("Network error"));
    };

    xhr.send();
  });
};