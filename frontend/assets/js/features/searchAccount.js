import { URL_API } from "./url.js";
//console.info("searchAccount.js loaded");
export const searchAccount = async (accountNumber) => {
  try {
    const response = await fetch(
      `${URL_API}/getAccount/${encodeURIComponent(accountNumber)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error searching account:", error);
    alert("An error occurred while searching for the account.");
  }
};

//with xmlhttprequest
export const searchAccountXML = (accountNumber) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `${URL_API}/getAccount/${encodeURIComponent(accountNumber)}`,
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const result = JSON.parse(xhr.responseText);
        resolve(result);
      } else {
        const error = JSON.parse(xhr.responseText);
        alert(`Error: ${error.message}`);
        reject(error);
      }
    };

    xhr.onerror = () => {
      alert("An error occurred while searching for the account.");
      reject(new Error("Network error"));
    };

    xhr.send();
  });
};
