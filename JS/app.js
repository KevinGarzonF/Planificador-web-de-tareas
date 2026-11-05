const formulario = document.querySelector('#formulario-tarea');
const inputNombreTarea = document.querySelector('#campoTitulo');
const inputDescripcionTarea = document.querySelector('#campoDescripcion');
const inputFechaTarea = document.querySelector('#campoFecha');

// Contenedores y alertas
const contenedorTareas = document.querySelector('#contenedorTareas');
const alertaError = document.querySelector('#alertaError');
const moldeTarea = document.querySelector('#moldeTarea'); 



// validación
function validarCampoFormulario(dato) {
    if (dato.trim() === '') {
        return false; 
    } else {
        return true; 
    }
}

// Alerta
function mostrarError(mensaje) {
    alertaError.textContent = mensaje; 
    alertaError.classList.remove('d-none');
}

function ocultarError() {
    alertaError.classList.add('d-none');
    alertaError.textContent = '';
}



formulario.addEventListener('submit', function(evento) {
    
    evento.preventDefault();

    const nombre = inputNombreTarea.value;
    const descripcion = inputDescripcionTarea.value;
    const fecha = inputFechaTarea.value;


    console.log("Nombre: " + nombre);
    console.log("Descripción: " + descripcion);
    console.log("Fecha: " + fecha);


    if (!validarCampoFormulario(nombre)) {
        mostrarError('Es obligatorio ponerle titulo a esta nueva tarea');
        return; 
    }

    if (!validarCampoFormulario(fecha)) {
        mostrarError('Es obligatorio ponerle una fecha a esta nueva tarea');
        return; 
    }

   
    
    // Ocultamos cualquier error
    ocultarError();


    const clonTarea = moldeTarea.content.cloneNode(true);

    clonTarea.querySelector('h6').textContent = nombre;
    clonTarea.querySelector('.texto-fecha').textContent = fecha;

    contenedorTareas.prepend(clonTarea);

    formulario.reset()
});