class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;

   
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsed = JSON.parse(storedTasks);
      this.tasks = parsed.tasks || [];
      this.currentId = parsed.currentId || 0;
    }
  }

  
  addTask(name, description, dueDate, status = 'PORHACER') {
    this.currentId++;
    this.tasks.push({
      id: this.currentId,
      name: name,
      description: description,
      dueDate: dueDate,
      status: 'PORHACER' 
    });
  }


  deleteTask(taskId) {
    const newTasks = [];
    for (let task of this.tasks) {
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    this.tasks = newTasks;
  }

  
  save() {
    const data = {
      tasks: this.tasks,
      currentId: this.currentId
    };
    localStorage.setItem('tasks', JSON.stringify(data));
  }


  createTaskHtml(task) {
    return `
      <div class="col-md-6 mb-3">
        <div class="tarjeta-tarea-limpia" data-task-id="${task.id}">
          <h6 class="fw-bold mb-2">${task.name}</h6>
          <span class="etiqueta-estado">${task.status === 'PORHACER' ? 'Pendiente' : 'Hecha'}</span>
          <p class="texto-fecha mt-2 mb-0">${task.dueDate}</p>
          <button class="delete-button btn btn-danger btn-sm mt-2">Eliminar</button>
        </div>
      </div>
    `;
  }

  
  render() {
    const contenedor = document.querySelector('#contenedorTareas');
    contenedor.innerHTML = ''; // limpiar
    for (let task of this.tasks) {
      contenedor.innerHTML += this.createTaskHtml(task);
    }
  }
}