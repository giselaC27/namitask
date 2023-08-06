import { useContext } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import ProjectContext from "../projects/ProjectContext"; // Importamos el ProjectContext

const TaskManager = () => {
  const { tasks, handleUpdateTasks } = useContext(ProjectContext);
  const handleCreateTask = (newTask) => {
    handleUpdateTasks((prevTasks) => [...prevTasks, newTask]);
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
      <TaskForm tasks={tasks} onCreateTask={handleCreateTask} />
      <TaskList
        tasks={tasks} // Pasamos las tareas filtradas al TaskList
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskManager;
