const API_URL = "https://backendiacorreo-production.up.railway.app/info";

fetch(API_URL)
  .then(res => {
    if (!res.ok) {
      throw new Error("Error al consultar el backend");
    }
    return res.json();
  })
  .then(data => {
    document.getElementById("fechas").textContent =
      data.fechas_escolares || "No disponible";

    document.getElementById("costos").textContent =
      data.costos || "No disponible";

    document.getElementById("becas").textContent =
      data.becas || "No disponible";
  })
  .catch(err => {
    console.error(err);
    document.body.innerHTML =
      "<p>Error al cargar la información. Intente más tarde.</p>";
  });
