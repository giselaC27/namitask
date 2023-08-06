import { useContext } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import ProjectContext from "../projects/ProjectContext"; // Importamos el ProjectContext
import axios from "axios"; 

const TaskManager = () => {
  const { tasks, handleUpdateTasks, selectedProject } = useContext(ProjectContext); // Obtenemos el proyecto seleccionado desde el contexto


  const handleCreateTask = (newTask) => {
    // Enviar solicitud POST a la API para crear una nueva tarea en el proyecto seleccionado
    axios
      .post(`http://localhost:8083/api/v2/proyect/${selectedProject.id}`, newTask)
      .then((response) => {
        // Actualizar las tareas localmente después de crear la tarea en la API
        handleUpdateTasks((prevTasks) => [...prevTasks, response.data]);
      })
      .catch((error) => {
        // Manejar errores en caso de que la solicitud falle
        console.error("Error al crear la tarea:", error);
      });
  };

  const handleEditTask = (taskId, editedTaskData) => {
    handleUpdateTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...editedTaskData } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    handleUpdateTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <TaskForm tasks={tasks || []} onCreateTask={handleCreateTask} />
<TaskList
  tasks={tasks || []}
  onEditTask={handleEditTask}
  onDeleteTask={handleDeleteTask}
/>
    </div>
  );
};
export default TaskManager;
