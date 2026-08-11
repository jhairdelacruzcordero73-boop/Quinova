/* =========================
   MENÚ PARA CELULAR
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });

    });
}


/* =========================
   AÑO AUTOMÁTICO
========================= */

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


/* =========================
   ANIMACIONES
========================= */

const elements = document.querySelectorAll(
    ".section-title, .about-grid, .product-card, .benefit, .gallery-item, .team-card, .contact-container"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("reveal");
                entry.target.classList.add("active");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);


elements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});


/* =========================
   FORMULARIO DE CONTACTO
========================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const nombre =
            document.getElementById("nombre").value.trim();

        const correo =
            document.getElementById("correo").value.trim();

        const mensaje =
            document.getElementById("mensaje").value.trim();


        if (!nombre || !correo || !mensaje) {

            formMessage.textContent =
                "Completa todos los campos.";

            return;
        }


        const texto =
            "Hola Quinova.%0A%0A" +
            "Nombre: " + encodeURIComponent(nombre) +
            "%0ACorreo: " + encodeURIComponent(correo) +
            "%0AMensaje: " + encodeURIComponent(mensaje);


        window.open(
            "https://wa.me/51912124850?text=" + texto,
            "_blank"
        );


        formMessage.textContent =
            "Abriendo WhatsApp...";

        contactForm.reset();

    });

}
