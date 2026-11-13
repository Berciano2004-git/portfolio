// Portfolio de Carlos Berciano Cabezas
// Menú, animaciones accesibles y pequeños detalles de interfaz.

document.addEventListener("DOMContentLoaded", () => {
  // Año automático del pie de página.
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // Cerrar el menú desplegable después de seleccionar una sección en móvil.
  const navbar = document.getElementById("navbarContent");
  const navLinks = document.querySelectorAll("#navbarContent .nav-link, #navbarContent .btn");
  if (navbar && window.bootstrap) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992) {
          const collapse = bootstrap.Collapse.getInstance(navbar);
          if (collapse) collapse.hide();
        }
      });
    });
  }

  // Mostrar elementos al entrar en pantalla. Si no existe IntersectionObserver,
  // el contenido permanece visible para no perjudicar la navegación.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Rotación sencilla de especialidades. Se desactiva con movimiento reducido.
  const roleElement = document.querySelector(".type-writer");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (roleElement && !reduceMotion) {
    const roles = ["Estudiante DAW", "Desarrollo web", "Técnico informático"];
    let roleIndex = 0;
    window.setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleElement.textContent = roles[roleIndex];
    }, 2600);
  }

  // Validación del formulario antes de enviarlo al servicio de recepción.
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      if (!contactForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        contactForm.classList.add("was-validated");
        if (formStatus) formStatus.textContent = "Revisa los campos marcados antes de enviar el mensaje.";
      } else {
        contactForm.classList.add("was-validated");
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.innerHTML = 'Enviando... <i class="bi bi-hourglass-split ms-1"></i>';
        }
        if (formStatus) formStatus.textContent = "Enviando tu mensaje...";
      }
    });
  }

});
