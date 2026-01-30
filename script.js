const API_URL = "https://backendiacorreo-production.up.railway.app/info";

const fechas = document.getElementById("fechas");
const costos = document.getElementById("costos");
const becas = document.getElementById("becas");

const editarBtn = document.getElementById("editarBtn");
const guardarBtn = document.getElementById("guardarBtn");

// Cargar datos
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    fechas.value = data.fechas_escolares || "";
    costos.value = data.costos || "";
    becas.value = data.becas || "";
  });

// Habilitar edición
editarBtn.addEventListener("click", () => {
  fechas.disabled = false;
  costos.disabled = false;
  becas.disabled = false;
  guardarBtn.disabled = false;
});

// Guardar cambios
guardarBtn.addEventListener("click", () => {
  const payload = {
    fechas_escolares: fechas.value,
    costos: costos.value,
    becas: becas.value
  };

  fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar");
      return res.json();
    })
    .then(() => {
      alert("Información guardada correctamente");

      fechas.disabled = true;
      costos.disabled = true;
      becas.disabled = true;
      guardarBtn.disabled = true;
    })
    .catch(err => {
      alert("Error al guardar cambios");
      console.error(err);
    });
});
