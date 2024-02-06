import { useContext } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import ProjectContext from "../projects/ProjectContext"; // Importamos el ProjectContext

import axios from "axios";

const TaskManager = () => {
  const { tasks, handleUpdateTasks, selectedProject } =
    useContext(ProjectContext); // Obtenemos el proyecto seleccionado desde el contexto
  //CREAR TAREAS
  const handleCreateTask = (newTask) => {
    handleUpdateTasks((prevTasks) => [...prevTasks, newTask]);
    // Enviar solicitud POST a la API para crear una nueva tarea en el proyecto seleccionado
    axios
      .post(`http://localhost:8080/api/v2/task/${selectedProject.id}`, newTask)

      .catch((error) => {
        // Manejar errores en caso de que la solicitud falle
        console.error("Error al crear la tarea:", error);
      });
  };

  //EDITAR TAREAS

  const handleEditTask = (taskId, editedTaskData) => {
    handleUpdateTasks((prevTasks) => {
      return prevTasks.map((task) =>
        task._id === taskId ? editedTaskData : task
      );
    });
    axios
      .put(
        `http://localhost:8080/api/v2/task/${selectedProject.id}`,
        editedTaskData
      )

      .catch((error) => {
        // Manejar errores en caso de que la solicitud falle
        console.error("Error al actualizar la tarea:", error);
      });
  };

  //ELIMINAR TAREAS

  const handleDeleteTask = (taskId) => {
    // Buscar la tarea correspondiente al taskId
    const taskToDelete = tasks.find((task) => task._id === taskId);

    // Verificar si se encontró la tarea antes de continuar
    if (!taskToDelete) {
      console.error("No se encontró la tarea a eliminar.");
      return;
    }

    // Enviar solicitud DELETE a la API para eliminar la tarea usando selectedProject.id
    axios
      .delete(`http://localhost:8080/api/v2/task/${selectedProject.id}`, {
        data: taskToDelete,
      })
      .then(() => {
        // Actualizar las tareas localmente después de eliminar la tarea en la API
        handleUpdateTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar la tarea:", error);
      });
  };

  //ESTADO DE LAS TAREAS
  const handleStatusToggle = (taskId) => {
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    if (!taskToUpdate) {
      console.error("No se encontró la tarea a actualizar.");
      return;
    }

    const updatedTask = { ...taskToUpdate, state: !taskToUpdate.state};

    // Actualiza localmente
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? updatedTask : task
    );
    handleUpdateTasks(updatedTasks);

    // Actualiza en el servidor
    axios
      .put(
        `http://localhost:8083/api/v2/task/${selectedProject.id}`,
        updatedTask
      )
      .catch((error) => {
        console.error("Error al actualizar el estado de la tarea:", error);
      });
  };
  
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Mis tareas 📚 </h1>
      {selectedProject ? (
        <>
          <TaskForm tasks={tasks || []} onCreateTask={handleCreateTask} />
          <TaskList
            tasks={tasks || []}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onStatusToggle={handleStatusToggle}
            
          />
        </>
      ) : (
        <p>Selecciona un proyecto para empezar a agregar tareas.</p>
      )}
    </div>
  );
};

export default TaskManager;