// CONSTANTES
const formulario = document.querySelector("#formulario-tarea");
const inputNombreTarea = document.querySelector("#campoTitulo");
const inputDescripcionTarea = document.querySelector("#campoDescripcion");
const inputFechaTarea = document.querySelector("#campoFecha");
const contenedorTareas = document.querySelector("#contenedorTareas");
const alertaError = document.querySelector("#alertaError");

// TASKMANAGER
const taskManager = new TaskManager();

function validarCampoFormulario(dato) {
  return dato.trim() !== "";
}
function mostrarError(mensaje) {
  alertaError.textContent = mensaje;
  alertaError.classList.remove("d-none");
}
function ocultarError() {
  alertaError.classList.add("d-none");
  alertaError.textContent = "";
}

// FORMULARIO
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nombre = inputNombreTarea.value;
    const descripcion = inputDescripcionTarea.value;
    const fecha = inputFechaTarea.value;

    // ✅ Validación de la Tarea 5 intacta
    if (!validarCampoFormulario(nombre)) {
        mostrarError('¡Ups! El campo "Título" es obligatorio.');
        return;
    }
    if (!validarCampoFormulario(fecha)) {
        mostrarError('¡Ups! El campo "Fecha" es obligatorio.');
        return;
    }

    ocultarError();

  
    taskManager.addTask(nombre, descripcion, fecha);

    console.log('Tareas en TaskManager:', taskManager.tasks);

    taskManager.save();
    taskManager.render();

    formulario.reset();
});

contenedorTareas.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("etiqueta-estado") ||
    event.target.classList.contains("etiqueta-estado-completada")
  ) {
    const parentTask = event.target.parentElement;
    const taskId = Number(parentTask.dataset.taskId);
    const tarea = taskManager.tasks.find((t) => t.id === taskId);

    if (tarea) {
      tarea.status = tarea.status === "PORHACER" ? "HECHA" : "PORHACER";
      taskManager.save();
      taskManager.render();
    }
    return;
  }

  // parte para eliminar tarea
  if (event.target.classList.contains("delete-button")) {
    const parentTask = event.target.parentElement;
    const taskId = Number(parentTask.dataset.taskId);
    taskManager.deleteTask(taskId);
    taskManager.save();
    taskManager.render();
  }
});

taskManager.render();
