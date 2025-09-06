import { URL_API } from "./url.js";
//console.info("deleteAccount.js loaded");
export const deleteAccount = async (id) => {
  console.info(id);
  try {
    const response = await fetch(`${URL_API}/closeAccount/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (response.ok) {
     // alert("Account deleted successfully!");
      return result;
    // } else {
    //   alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    //alert("An error occurred while deleting the account.");
  }
};

//with xmlhttprequest
export const deleteAccountXML = (id) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${URL_API}/closeAccount/${id}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const result = JSON.parse(xhr.responseText);
       // alert("Account deleted successfully!");
        resolve(result);
      } else {
        const error = JSON.parse(xhr.responseText);
       // alert(`Error: ${error.message}`);
        reject(error);
      }
    };

    xhr.onerror = () => {
     // alert("An error occurred while deleting the account.");
      reject(new Error("Network error"));
    };

    xhr.send();
  });
};