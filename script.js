// Animación al aparecer las secciones

const secciones = document.querySelectorAll("section");


function mostrar(){

    secciones.forEach((seccion)=>{

        const posicion = seccion.getBoundingClientRect().top;

        const pantalla = window.innerHeight;


        if(posicion < pantalla - 100){

            seccion.classList.add("mostrar");

        }

    });

}


window.addEventListener("scroll", mostrar);


mostrar();



// Mensaje de bienvenida

window.onload = function(){

console.log(
"🌾 Bienvenido a Quinova - Nutrición que nace de los Andes"
);

};
