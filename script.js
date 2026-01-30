const INFO_API_URL = "https://backendiacorreo-production.up.railway.app/info";
const AGENTE_API_URL = "https://backendiacorreo-production.up.railway.app/config/agente";

// ======== ELEMENTOS INFO ESCOLAR ========
const fechas = document.getElementById("fechas");
const costos = document.getElementById("costos");
const becas = document.getElementById("becas");

const editarBtn = document.getElementById("editarBtn");
const guardarBtn = document.getElementById("guardarBtn");

// ======== ELEMENTOS AGENTE ========
const estadoAgente = document.getElementById("estadoAgente");
const toggleAgenteBtn = document.getElementById("toggleAgenteBtn");

// ======== CARGAR INFO ESCOLAR ========
fetch(INFO_API_URL)
  .then(res => res.json())
  .then(data => {
    fechas.value = data.fechas_escolares || "";
    costos.value = data.costos || "";
    becas.value = data.becas || "";
  });

// ======== HABILITAR EDICIÓN ========
editarBtn.addEventListener("click", () => {
  fechas.disabled = false;
  costos.disabled = false;
  becas.disabled = false;
  guardarBtn.disabled = false;
});

// ======== GUARDAR CAMBIOS INFO ========
guardarBtn.addEventListener("click", () => {
  const payload = {
    fechas_escolares: fechas.value,
    costos: costos.value,
    becas: becas.value
  };

  fetch(INFO_API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
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

// ======================================================
// ================== AGENTE DE CORREOS =================
// ======================================================

// Cargar estado del agente
function cargarEstadoAgente() {
  fetch(AGENTE_API_URL)
    .then(res => res.json())
    .then(data => {
      if (data.activo) {
        estadoAgente.textContent = "Activo";
        estadoAgente.style.color = "green";
        toggleAgenteBtn.textContent = "Desactivar agente";
      } else {
        estadoAgente.textContent = "Desactivado";
        estadoAgente.style.color = "red";
        toggleAgenteBtn.textContent = "Activar agente";
      }

      toggleAgenteBtn.disabled = false;
      toggleAgenteBtn.dataset.activo = data.activo;
    })
    .catch(err => {
      estadoAgente.textContent = "Error";
      toggleAgenteBtn.disabled = true;
      console.error(err);
    });
}

// Activar / desactivar agente
toggleAgenteBtn.addEventListener("click", () => {
  const activoActual = toggleAgenteBtn.dataset.activo === "true";
  const nuevoEstado = !activoActual;

  fetch(AGENTE_API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ activo: nuevoEstado })
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al actualizar agente");
      return res.json();
    })
    .then(() => {
      cargarEstadoAgente();
    })
    .catch(err => {
      alert("Error al cambiar estado del agente");
      console.error(err);
    });
});

// Cargar estado del agente al iniciar
cargarEstadoAgente();
