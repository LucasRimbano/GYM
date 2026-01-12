
document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------
  // 1) FORM: validaciones + mensajes
  // Requiere en tu HTML (dentro del form):
  // <div class="form-message" id="formMessage" aria-live="polite"></div>
  // -------------------------------
  const form = document.querySelector(".lead-form");
  const ageInput = document.getElementById("age");
  const weightInput = document.getElementById("kg");
  const heightInput = document.getElementById("cm"); 
  const messageBox = document.getElementById("formMessage");

  function showMessage(text, type) {
    if (!messageBox) return;
    messageBox.className = "form-message show " + type; // success | warning | error
    messageBox.textContent = text;
  }

  function clearMessage() {
    if (!messageBox) return;
    messageBox.className = "form-message";
    messageBox.textContent = "";
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      clearMessage();

      const age = parseInt(ageInput?.value, 10);
      const weight = parseInt(weightInput?.value, 10);
      const height = parseInt(heightInput?.value, 10);

      // Validaciones básicas
      if (Number.isNaN(age) || age <= 0) {
        showMessage("Por favor ingresá una edad válida.", "error");
        ageInput?.focus();
        return;
      }

      if (Number.isNaN(weight) || weight <= 0) {
        showMessage("Por favor ingresá un peso válido (kg).", "error");
        weightInput?.focus();
        return;
      }

      if (Number.isNaN(height) || height <= 0) {
        showMessage("Por favor ingresá una altura válida (cm).", "error");
        heightInput?.focus();
        return;
      }

      // Reglas: edad
      if (age >= 18) {
        // Mayor de edad
        if (weight >= 80) {
          showMessage(
            "✅ Podés ser socio del Gym. Además: tu peso es superior a 80 kg; te recomendamos evaluación inicial para ajustar el plan. En breve te contactamos con planes y horarios.",
            "warning"
          );
        } else {
          showMessage(
            "✅ Podés ser socio del Gym. En breve nos comunicamos para enviarte los planes disponibles.",
            "success"
          );
        }
      } else {
        // Menor de edad
        showMessage(
          "⚠️ Sos menor de 18 años. Para inscribirte necesitás venir con una autorización firmada por tu madre, padre o tutor legal.",
          "warning"
        );
      }

      // Futuro (si querés):
      // - enviar datos al backend
      // - abrir WhatsApp con mensaje prearmado
      // - redirigir a una sección específica
    });
  }

  // -----------------------------------------
  // 2) TOP BAR: Estado Abierto / Cerrado
  // Requiere en tu HTML (dentro de .header-actions):
  // <div class="status-pill" id="gymStatus" aria-live="polite">
  //   <span class="dot" aria-hidden="true"></span>
  //   <span class="label">Cargando…</span>
  // </div>
  //
  // Horario: Lun–Vie 07:00–22:00 (hora local del navegador)
  // -----------------------------------------
  const statusEl = document.getElementById("gymStatus");

  function updateGymStatus() {
    if (!statusEl) return;

    const now = new Date();

    // 0=Dom, 1=Lun, 2=Mar, 3=Mié, 4=Jue, 5=Vie, 6=Sáb
    const day = now.getDay();
    const hour = now.getHours();
    const minute = now.getMinutes();

    const isWeekday = day >= 1 && day <= 5;

    // Ajustá el horario acá si querés
    const openHour = 7;    // abre 07:00
    const closeHour = 22;  // cierra 22:00 (a las 22:00 ya se considera cerrado)

    const isOpen =
      isWeekday &&
      (hour > openHour || (hour === openHour && minute >= 0)) &&
      hour < closeHour;

    statusEl.classList.remove("is-open", "is-closed");

    const label = statusEl.querySelector(".label");
    if (!label) return;

    if (isOpen) {
      statusEl.classList.add("is-open");
      label.textContent = "Abierto ahora (Lun–Vie 07:00–22:00)";
    } else {
      statusEl.classList.add("is-closed");
      label.textContent = "Cerrado (Lun–Vie 07:00–22:00)";
    }
  }

  updateGymStatus();
  setInterval(updateGymStatus, 30000); // refresca cada 30s
});
