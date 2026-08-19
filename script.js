/* =========================================================
   QUINOVA
   SCRIPT PRINCIPAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MENÚ MÓVIL
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const abierto = navMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                abierto ? "true" : "false"
            );

            menuToggle.innerHTML = abierto ? "✕" : "☰";

        });

        const enlacesMenu =
            navMenu.querySelectorAll("a");

        enlacesMenu.forEach((enlace) => {

            enlace.addEventListener("click", () => {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML = "☰";

            });

        });

    }


    /* =====================================================
       2. AÑO AUTOMÁTICO DEL FOOTER
       ===================================================== */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       3. SCROLL SUAVE
       ===================================================== */

    const enlacesInternos =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    enlacesInternos.forEach((enlace) => {

        enlace.addEventListener("click", (evento) => {

            const destino =
                enlace.getAttribute("href");

            if (
                !destino ||
                destino === "#"
            ) {

                return;

            }

            const seccion =
                document.querySelector(destino);

            if (!seccion) {

                return;

            }

            evento.preventDefault();

            seccion.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       4. HEADER AL HACER SCROLL
       ===================================================== */

    const header =
        document.querySelector(".header");

    function actualizarHeader() {

        if (!header) {

            return;

        }

        if (window.scrollY > 50) {

            header.classList.add(
                "header-scrolled"
            );

        } else {

            header.classList.remove(
                "header-scrolled"
            );

        }

    }

    window.addEventListener(
        "scroll",
        actualizarHeader
    );

    actualizarHeader();


    /* =====================================================
       5. ANIMACIONES AL APARECER
       ===================================================== */

    const elementosAnimados =
        document.querySelectorAll(
            ".product-card, " +
            ".benefit-card, " +
            ".team-card, " +
            ".gallery-item, " +
            ".feature"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observador =
            new IntersectionObserver(
                (entradas, observer) => {

                    entradas.forEach(
                        (entrada) => {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entrada.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        elementosAnimados.forEach(
            (elemento) => {

                elemento.classList.add(
                    "animar-scroll"
                );

                observador.observe(
                    elemento
                );

            }
        );

    }


    /* =====================================================
       6. BOTONES DE PRODUCTOS
       ===================================================== */

    const botonesProducto =
        document.querySelectorAll(
            ".product-button"
        );


    botonesProducto.forEach(
        (boton) => {

            boton.addEventListener(
                "click",
                (evento) => {

                    const tarjeta =
                        boton.closest(
                            ".product-card"
                        );

                    if (!tarjeta) {

                        return;

                    }

                    const titulo =
                        tarjeta.querySelector(
                            "h3"
                        );

                    if (!titulo) {

                        return;

                    }

                    const producto =
                        titulo.textContent.trim();

                    const mensaje =
                        encodeURIComponent(
                            "Hola, quisiera información sobre " +
                            producto +
                            " de Quinova."
                        );

                    const telefono =
                        "51912124850";

                    const url =
                        "https://wa.me/" +
                        telefono +
                        "?text=" +
                        mensaje;

                    window.open(
                        url,
                        "_blank"
                    );

                }
            );

        }
    );


    /* =====================================================
       7. WHATSAPP
       ===================================================== */

    const whatsappLinks =
        document.querySelectorAll(
            ".contact-whatsapp, " +
            ".whatsapp-floating"
        );


    whatsappLinks.forEach(
        (enlace) => {

            enlace.addEventListener(
                "click",
                () => {

                    const telefono =
                        "51912124850";

                    const mensaje =
                        encodeURIComponent(
                            "Hola, quisiera información sobre los productos de Quinova."
                        );

                    const url =
                        "https://wa.me/" +
                        telefono +
                        "?text=" +
                        mensaje;

                    enlace.href = url;

                }
            );

        }
    );


    /* =====================================================
       8. FORMULARIO DE CONTACTO
       ===================================================== */

    const formulario =
        document.querySelector(
            ".contact-form"
        );


    if (formulario) {

        formulario.addEventListener(
            "submit",
            (evento) => {

                const nombre =
                    formulario.querySelector(
                        '[name="nombre"]'
                    );

                const correo =
                    formulario.querySelector(
                        '[name="correo"]'
                    );

                const mensaje =
                    formulario.querySelector(
                        '[name="mensaje"]'
                    );


                if (
                    !nombre ||
                    !correo ||
                    !mensaje
                ) {

                    return;

                }


                if (
                    !nombre.value.trim() ||
                    !correo.value.trim() ||
                    !mensaje.value.trim()
                ) {

                    evento.preventDefault();

                    mostrarMensaje(
                        formulario,
                        "Por favor, completa todos los campos.",
                        "error"
                    );

                    return;

                }


                if (
                    !validarCorreo(
                        correo.value
                    )
                ) {

                    evento.preventDefault();

                    mostrarMensaje(
                        formulario,
                        "Escribe un correo electrónico válido.",
                        "error"
                    );

                    return;

                }

            }
        );

    }


    /* =====================================================
       9. VALIDAR CORREO
       ===================================================== */

    function validarCorreo(correo) {

        const expresion =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return expresion.test(
            correo
        );

    }


    /* =====================================================
       10. MENSAJE DEL FORMULARIO
       ===================================================== */

    function mostrarMensaje(
        formulario,
        texto,
        tipo
    ) {

        let mensaje =
            formulario.querySelector(
                ".form-message"
            );


        if (!mensaje) {

            mensaje =
                document.createElement(
                    "div"
                );

            mensaje.className =
                "form-message";

            formulario.appendChild(
                mensaje
            );

        }


        mensaje.textContent =
            texto;


        mensaje.style.color =
            tipo === "error"
                ? "#b3261e"
                : "#52734d";

    }


    /* =====================================================
       11. CARGA DE IMÁGENES
       ===================================================== */

    const imagenes =
        document.querySelectorAll(
            "img"
        );


    imagenes.forEach(
        (imagen) => {

            imagen.addEventListener(
                "error",
                () => {

                    imagen.classList.add(
                        "imagen-error"
                    );

                    console.warn(
                        "No se pudo cargar la imagen:",
                        imagen.src
                    );

                }
            );


            imagen.addEventListener(
                "load",
                () => {

                    imagen.classList.add(
                        "imagen-cargada"
                    );

                }
            );

        }
    );


    /* =====================================================
       12. BOTÓN PARA VOLVER ARRIBA
       ===================================================== */

    let botonArriba =
        document.querySelector(
            ".volver-arriba"
        );


    if (!botonArriba) {

        botonArriba =
            document.createElement(
                "button"
            );

        botonArriba.className =
            "volver-arriba";

        botonArriba.type =
            "button";

        botonArriba.setAttribute(
            "aria-label",
            "Volver al inicio"
        );

        botonArriba.innerHTML =
            "↑";

        document.body.appendChild(
            botonArriba
        );

    }


    function mostrarBotonArriba() {

        if (
            window.scrollY > 500
        ) {

            botonArriba.classList.add(
                "mostrar"
            );

        } else {

            botonArriba.classList.remove(
                "mostrar"
            );

        }

    }


    window.addEventListener(
        "scroll",
        mostrarBotonArriba
    );


    botonArriba.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       13. DETECCIÓN DE SECCIÓN ACTIVA
       ===================================================== */

    const secciones =
        document.querySelectorAll(
            "section[id]"
        );

    const enlacesNav =
        document.querySelectorAll(
            ".nav-menu a"
        );


    if (
        secciones.length &&
        enlacesNav.length &&
        "IntersectionObserver"
        in window
    ) {

        const observadorSecciones =
            new IntersectionObserver(
                (entradas) => {

                    entradas.forEach(
                        (entrada) => {

                            if (
                                entrada.isIntersecting
                            ) {

                                const id =
                                    entrada.target.id;


                                enlacesNav.forEach(
                                    (enlace) => {

                                        enlace.classList.remove(
                                            "activo"
                                        );

                                    }
                                );


                                const enlaceActivo =
                                    document.querySelector(
                                        '.nav-menu a[href="#' +
                                        id +
                                        '"]'
                                    );


                                if (
                                    enlaceActivo
                                ) {

                                    enlaceActivo.classList.add(
                                        "activo"
                                    );

                                }

                            }

                        }
                    );

                },
                {
                    threshold: 0.35
                }
            );


        secciones.forEach(
            (seccion) => {

                observadorSecciones.observe(
                    seccion
                );

            }
        );

    }


    /* =====================================================
       14. REDES SOCIALES
       ===================================================== */

    const redes =
        document.querySelectorAll(
            ".social-button"
        );


    redes.forEach(
        (red) => {

            red.addEventListener(
                "click",
                () => {

                    const url =
                        red.getAttribute(
                            "href"
                        );


                    if (
                        !url ||
                        url === "#"
                    ) {

                        console.warn(
                            "Esta red social todavía no tiene un enlace configurado."
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       15. PREVENIR ENLACES VACÍOS
       ===================================================== */

    const enlaces =
        document.querySelectorAll(
            "a"
        );


    enlaces.forEach(
        (enlace) => {

            enlace.addEventListener(
                "click",
                (evento) => {

                    const href =
                        enlace.getAttribute(
                            "href"
                        );


                    if (
                        href === "" ||
                        href === "#"
                    ) {

                        evento.preventDefault();

                    }

                }
            );

        }
    );


    /* =====================================================
       16. TECLA ESC PARA CERRAR MENÚ
       ===================================================== */

    document.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key === "Escape"
            ) {

                if (navMenu) {

                    navMenu.classList.remove(
                        "active"
                    );

                }

                if (menuToggle) {

                    menuToggle.innerHTML =
                        "☰";

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =====================================================
       17. EFECTO PARALLAX SUAVE
       ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    if (
        heroImage &&
        window.innerWidth > 800
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const desplazamiento =
                    window.scrollY;

                if (
                    desplazamiento < 700
                ) {

                    heroImage.style.transform =
                        "translateY(" +
                        desplazamiento * 0.04 +
                        "px)";

                }

            }
        );

    }


    /* =====================================================
       18. DETECTAR FORMULARIO ENVIADO
       ===================================================== */

    const params =
        new URLSearchParams(
            window.location.search
        );


    if (
        params.get("enviado") === "1"
    ) {

        const formulario =
            document.querySelector(
                ".contact-form"
            );


        if (formulario) {

            mostrarMensaje(
                formulario,
                "¡Gracias! Tu mensaje fue enviado correctamente.",
                "success"
            );

        }

    }


    /* =====================================================
       19. MENSAJE DE INICIO
       ===================================================== */

    console.log(
        "🌾 Quinova está funcionando correctamente."
    );

    console.log(
        "📱 WhatsApp configurado: 912124850"
    );


});
