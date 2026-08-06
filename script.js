// Animaciones al aparecer las secciones

const secciones = document.querySelectorAll("section");


function mostrarSecciones(){

    secciones.forEach(seccion => {

        const posicion = seccion.getBoundingClientRect().top;

        const pantalla = window.innerHeight;


        if(posicion < pantalla - 100){

            seccion.classList.add("mostrar");

        }

    });

}


window.addEventListener("scroll", mostrarSecciones);


mostrarSecciones();



// Mensaje de bienvenida

console.log(
"🌾 Bienvenido a Quinova - Nutrición que nace de los Andes"
);



// Efecto al cargar la página

window.onload = () => {

    document.body.style.opacity = "1";

};
