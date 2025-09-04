const URL_API = new URL("http://localhost:3000/api/comptes");
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
      alert(`Error: ${comptes.message}`);
      return [];
    }
  } catch (error) {
    console.error("Error fetching accounts:", error);
    alert("An error occurred while fetching accounts.");
    return [];
  }
}