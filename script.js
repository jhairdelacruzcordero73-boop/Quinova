
// Animación al aparecer elementos

const secciones = document.querySelectorAll("section");


function mostrarSecciones(){

    secciones.forEach(seccion => {

        const posicion = seccion.getBoundingClientRect().top;

        const alturaPantalla = window.innerHeight;


        if(posicion < alturaPantalla - 100){

            seccion.style.opacity = "1";
            seccion.style.transform = "translateY(0)";

        }

    });

}


window.addEventListener("scroll", mostrarSecciones);



secciones.forEach(seccion => {

    seccion.style.opacity = "0";

    seccion.style.transform = "translateY(50px)";

    seccion.style.transition = "0.8s ease";

});



mostrarSecciones();



// Mensaje de bienvenida

console.log("🌾 Bienvenido a Quinova - Nutrición que nace de los Andes");
