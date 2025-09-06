import { URL_API } from "./url.js";
//console.info("debiterAccount.js loaded");
export const debiterAccount = async (accountNumber, amount) => {
  console.info(accountNumber, amount);
  try {
    const response = await fetch(`${URL_API}/debiterAccount/${accountNumber}/${amount}`, {
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
    console.error("Error debiting account:", error);
   // alert("An error occurred while debiting the account.");
  }
}

//with xmlhttprequest
export const debiterAccountXML = (accountNumber, amount) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `${URL_API}/debiterAccount/${accountNumber}/${amount}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const result = JSON.parse(xhr.responseText);
       // alert("Account debited successfully!");
        resolve(result);
      } else {
        const error = JSON.parse(xhr.responseText);
       // alert(`Error: ${error.message}`);
        reject(error);
      }
    };

    xhr.onerror = () => {
     // alert("An error occurred while debiting the account.");
      reject(new Error("Network error"));
    };

    xhr.send();
  });
};