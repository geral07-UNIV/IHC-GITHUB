
document.addEventListener("DOMContentLoaded", function () {
  initMenuToggle();
  initContactForm();
});

function initMenuToggle() {
  var toggleBtn = document.getElementById("menuToggle");
  var nav = document.getElementById("primary-nav");

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("nav-open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  /* Cierra el menú automáticamente al elegir una opción,
     para que no quede abierto al cambiar de página. */
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("nav-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

function initContactForm() {
  var form = document.getElementById("registroForm");
  if (!form) return;

  var successBox = document.getElementById("formSuccess");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var isValid = true;

    isValid = validateRequiredText("nombre", "El nombre es obligatorio.") && isValid;
    isValid = validateEmail("correo") && isValid;
    isValid = validateRequiredSelect("tipo-usuario", "Elige una opción.") && isValid;
    isValid = validateCheckbox("terminos", "Debes aceptar los términos para continuar.") && isValid;

    if (isValid) {
      form.reset();
      successBox.hidden = false;
      successBox.focus();
    } else {
      successBox.hidden = true;
    }
  });
}

/* Valida un campo de texto simple (no vacío) */
function validateRequiredText(fieldId, message) {
  var field = document.getElementById(fieldId);
  var value = field.value.trim();

  if (value === "") {
    showError(fieldId, message);
    return false;
  }
  clearError(fieldId);
  return true;
}

/* Valida formato de correo con una expresión regular básica */
function validateEmail(fieldId) {
  var field = document.getElementById(fieldId);
  var value = field.value.trim();
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (value === "") {
    showError(fieldId, "El correo es obligatorio.");
    return false;
  }
  if (!pattern.test(value)) {
    showError(fieldId, "Ingresa un correo válido (ejemplo: nombre@correo.com).");
    return false;
  }
  clearError(fieldId);
  return true;
}

/* Valida que se haya elegido una opción del select */
function validateRequiredSelect(fieldId, message) {
  var field = document.getElementById(fieldId);

  if (field.value === "") {
    showError(fieldId, message);
    return false;
  }
  clearError(fieldId);
  return true;
}

/* Valida que el checkbox de términos esté marcado */
function validateCheckbox(fieldId, message) {
  var field = document.getElementById(fieldId);

  if (!field.checked) {
    showError(fieldId, message);
    return false;
  }
  clearError(fieldId);
  return true;
}

/* Muestra el mensaje de error debajo del campo indicado */
function showError(fieldId, message) {
  var field = document.getElementById(fieldId);
  var errorSpan = document.getElementById("error-" + fieldId);
  var group = document.getElementById("group-" + fieldId);

  if (errorSpan) errorSpan.textContent = message;
  if (group) group.classList.add("has-error");
}

/* Limpia el mensaje de error del campo indicado */
function clearError(fieldId) {
  var errorSpan = document.getElementById("error-" + fieldId);
  var group = document.getElementById("group-" + fieldId);

  if (errorSpan) errorSpan.textContent = "";
  if (group) group.classList.remove("has-error");
}
