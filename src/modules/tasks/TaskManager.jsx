import { useState, useContext } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import tasksData from "../../data/data";
import ProjectContext from "../projects/ProjectContext"; // Importamos el ProjectContext

const TaskManager = () => {
  const { selectedProject } = useContext(ProjectContext); // Obtenemos el proyecto seleccionado desde el contexto
  const [tasks, setTasks] = useState(tasksData);

  const handleCreateTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleEditTask = (taskId, editedTaskData) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...editedTaskData } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Filtrar las tareas según el proyecto seleccionado
  const filteredTasks = selectedProject
    ? tasks.filter((task) => task.project === selectedProject.name)
    : tasks;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <TaskForm onCreateTask={handleCreateTask} />
      <TaskList
        tasks={filteredTasks} // Pasamos las tareas filtradas al TaskList
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskManager;
