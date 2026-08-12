/* ==================================================
   QUINOVA - SCRIPT PRINCIPAL
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==================================================
       AÑO AUTOMÁTICO DEL FOOTER
    ================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* ==================================================
       NAVEGACIÓN SUAVE
    ================================================== */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* ==================================================
       ANIMACIÓN AL APARECER LAS SECCIONES
    ================================================== */

    const elements = document.querySelectorAll(
        ".info-card, .product-card, .benefit-card, .team-card, .gallery-item, .innovation, .model-card, .customer-card"
    );


    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    elements.forEach(function (element) {

        element.style.opacity = "0";

        element.style.transform = "translateY(20px)";

        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(element);

    });


    /* ==================================================
       EFECTO DE APARICIÓN
    ================================================== */

    const style = document.createElement("style");

    style.textContent = `

        .info-card.visible,
        .product-card.visible,
        .benefit-card.visible,
        .team-card.visible,
        .gallery-item.visible,
        .innovation.visible,
        .model-card.visible,
        .customer-card.visible {

            opacity: 1 !important;

            transform: translateY(0) !important;

        }

    `;

    document.head.appendChild(style);


    /* ==================================================
       CERRAR MENSAJES DE ERROR DE IMÁGENES
    ================================================== */

    const images = document.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener("error", function () {

            console.warn(
                "No se pudo cargar la imagen:",
                image.getAttribute("src")
            );

        });

    });


    /* ==================================================
       BOTONES DE WHATSAPP
    ================================================== */

    const whatsappNumber = "51912124850";

    const whatsappLinks = document.querySelectorAll(
        'a[href*="wa.me"]'
    );


    whatsappLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            console.log(
                "Abriendo WhatsApp de Quinova:",
                whatsappNumber
            );

        });

    });


    /* ==================================================
       FORMULARIO DE CONTACTO
    ================================================== */

    const form = document.querySelector(".contact-form");

    if (form) {

        form.addEventListener("submit", function () {

            const button = form.querySelector(
                'button[type="submit"]'
            );

            if (button) {

                button.textContent = "Enviando...";

                button.disabled = true;

            }

        });

    }


    /* ==================================================
       BOTÓN DE WHATSAPP FLOTANTE
    ================================================== */

    const floatingWhatsapp =
        document.querySelector(".whatsapp-floating");

    if (floatingWhatsapp) {

        floatingWhatsapp.setAttribute(
            "title",
            "Escribir a Quinova por WhatsApp"
        );

    }


    /* ==================================================
       DETECTAR SECCIÓN ACTUAL
    ================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        ".nav a"
    );


    const sectionObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    navigationLinks.forEach(function (link) {

                        link.classList.remove("active");

                    });


                    const activeLink =
                        document.querySelector(
                            '.nav a[href="#' +
                            entry.target.id +
                            '"]'
                        );


                    if (activeLink) {

                        activeLink.classList.add("active");

                    }

                }

            });

        },
        {
            rootMargin: "-30% 0px -60% 0px"
        }
    );


    sections.forEach(function (section) {

        sectionObserver.observe(section);

    });


    /* ==================================================
       MENSAJE EN CONSOLA
    ================================================== */

    console.log(
        "🌾 Quinova - Página cargada correctamente."
    );

});
