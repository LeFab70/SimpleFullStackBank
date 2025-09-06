import { URL_API } from "./url.js";
//console.info("crediterAccount.js loaded");
export const crediterAccount = async (accountNumber, amount) => {
  console.info(accountNumber, amount);
  try {
    const response = await fetch(`${URL_API}/crediterAccount/${accountNumber}/${amount}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify({ accountNumber, amount }),
    });
    const result = await response.json();
    if (response.ok) {
      return result;
    // } else {
    //   alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error crediting account:", error);
   // alert("An error occurred while crediting the account.");
  }
};

//with xmlhttprequest
export const crediterAccountXML = (accountNumber, amount) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${URL_API}/crediterAccount/${accountNumber}/${amount}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const result = JSON.parse(xhr.responseText);
       // alert("Account credited successfully!");
        resolve(result);
      } else {
        const error = JSON.parse(xhr.responseText);
       // alert(`Error: ${error.message}`);
        reject(error);
      }
    };

    xhr.onerror = () => {
     // alert("An error occurred while crediting the account.");
      reject(new Error("Network error"));
    };

    xhr.send();
  });
};