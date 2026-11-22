
// CONSTANTES Y SELECCION DE ELEMENTOS

const formulario = document.querySelector('#formulario-tarea');
const inputNombreTarea = document.querySelector('#campoTitulo'); 
const inputDescripcionTarea = document.querySelector('#campoDescripcion'); 
const inputFechaTarea = document.querySelector('#campoFecha'); 
const contenedorTareas = document.querySelector('#contenedorTareas'); 
const alertaError = document.querySelector('#alertaError'); 
const moldeTarea = document.querySelector('#moldeTarea'); 


// TASKMANAGER 

const taskManager = new TaskManager();
console.log(taskManager.tasks); 


// FUNCIONES

function validarCampoFormulario(dato) {
    return dato.trim() !== ''; 
}

function mostrarError(mensaje) {
    alertaError.textContent = mensaje; 
    alertaError.classList.remove('d-none');
}

function ocultarError() {
    alertaError.classList.add('d-none');
    alertaError.textContent = '';
}


// FORMULARIO 

formulario.addEventListener('submit', function(evento) {
    
    evento.preventDefault();

    const nombre = inputNombreTarea.value;
    const descripcion = inputDescripcionTarea.value;
    const fecha = inputFechaTarea.value;

    if (!validarCampoFormulario(nombre)) {
        mostrarError('¡Ups! El campo "Título" es obligatorio.');
        return; 
    }
    if (!validarCampoFormulario(fecha)) {
        mostrarError('¡Ups! El campo "Fecha" es obligatorio.');
        return; 
    }

    ocultarError();

    //seccion por hacer

    taskManager.addTask(nombre, descripcion, fecha, 'PORHACER');
    console.log(taskManager.tasks);

    
    const clonTarea = moldeTarea.content.cloneNode(true);
    
    clonTarea.querySelector('h6').textContent = nombre;
    clonTarea.querySelector('.texto-fecha').textContent = fecha;
    
    const etiquetaEstado = clonTarea.querySelector('.etiqueta-estado');
    

    etiquetaEstado.addEventListener('click', function() {
        if (etiquetaEstado.textContent === 'Estado' || etiquetaEstado.textContent === 'Pendiente') {
            etiquetaEstado.textContent = 'Hecha';
            etiquetaEstado.classList.remove('etiqueta-estado');
            etiquetaEstado.classList.add('etiqueta-estado-completada');
        } else {
            etiquetaEstado.textContent = 'Pendiente';
            etiquetaEstado.classList.remove('etiqueta-estado-completada');
            etiquetaEstado.classList.add('etiqueta-estado');
        }
    });


    contenedorTareas.prepend(clonTarea);
    formulario.reset();
});


const etiquetasEstado = document.querySelectorAll('.etiqueta-estado, .etiqueta-estado-completada');

etiquetasEstado.forEach(function(etiqueta) {
    etiqueta.addEventListener('click', function() {
        if (etiqueta.textContent === 'Pendiente') {
            etiqueta.textContent = 'Hecha';
            etiqueta.classList.remove('etiqueta-estado');
            etiqueta.classList.add('etiqueta-estado-completada');
        } else {
            etiqueta.textContent = 'Pendiente';
            etiqueta.classList.remove('etiqueta-estado-completada');
            etiqueta.classList.add('etiqueta-estado');
        }
    });
});