import { useState } from "react";
import PropTypes from "prop-types";


const TaskListItem = ({
  //key
  task,
  onEditClick,
  onDeleteClick,
  onEditTask,
  isEditing,
  editedTaskData,
  onInputChange,
  onSaveClick,
  onCancelClick,
  onStatusToggle,
})  =>
 {
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const handleStatusToggle = (newState) => {
    const updatedTask = { ...task, state: newState.toString() };
    onStatusToggle(task._id, updatedTask);
  };
  
  return (
 
    <div key={task._id}
    className={`rounded-lg p-4 mb-4 ${
      (task.state === "true" || task.state === true) ? "bg-green-100" : "bg-orange-100"
    }`}>
      
      {isEditing ? (
        
        <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Nombre de Tarea:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              value={editedTaskData.name}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Descripción de Tarea:
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={editedTaskData.description}
              onChange={onInputChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="dateStart"
            >
              Fecha de Inicio:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dateStart"
              name="dateStart"
              type="date"
              min={getCurrentDate()} 
              value={editedTaskData.dateStart}
              onChange={onInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="dateFinish"
            >
              Fecha de Entrega:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dateFinish"
              name="dateFinish"
              type="date"
              min={getCurrentDate()} 
              value={editedTaskData.dateFinish}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={onSaveClick} 
            >
              Guardar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onCancelClick} 
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-bold mb-2">{task.name}</h3>

          <p className="text-gray-700 mb-2">
            <span className="font-bold">Descripción de Tarea:</span>{" "}
            {task.description}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-bold">Fecha de Inicio:</span>
              {task.dateStart} 
             
          </p>

          <p className="text-gray-700 mb-2">
            <span className="font-bold">Fecha de Entrega:</span>{" "}
            {task.dateFinish} 
            
          </p>
          <div className="mb-2">
            <label className="text-gray-700 font-bold">
              Estado de la Tarea:
            </label>
            <div className="flex items-center ml-2">
              <button
                onClick={() => handleStatusToggle(true)}
                className={`mr-2 px-3 py-1 rounded ${task.state === "true" || task.state === true
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                  }`}
              >
                Completada
              </button>
              <button
                onClick={() => handleStatusToggle(false)}
                className={`px-3 py-1 rounded ${(task.state === "false" || task.state === false)
                    ? "bg-red-500 text-white"
                    : "bg-gray-300 text-gray-700"
                  }`}
              >
                Pendiente
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={() => onEditClick(task._id)} 
            >
              Editar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => onDeleteClick(task._id)} 
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const TaskList = ({ tasks, onEditTask, onDeleteTask,  onStatusToggle}) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskData, setEditedTaskData] = useState({
    name: "",
    description: "",
    dateStart: "",
    dateFinish: "",
    state: "false",
  });

  const handleEditClick = (taskId) => {
    const taskToEdit = tasks.find((task) => task._id === taskId);
    setEditingTaskId(taskId);
    setEditedTaskData({ ...taskToEdit });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTaskData({ ...editedTaskData, [name]: value });
  };

  const handleSaveClick = () => {
    onEditTask(editingTaskId, editedTaskData);
    setEditingTaskId(null);
  };

  const handleCancelClick = () => {
    setEditingTaskId(null);
    setEditedTaskData({
      name: "",
      description: "",
      dateStart: "",
      dateFinish: "",
      
    });
  };

  const isTaskEditing = (taskId) => {
    return editingTaskId === taskId;
  };

  const handleDeleteTask = (taskId) => {
    onDeleteTask(taskId);
  };

  return (
    
    <div className="mt-4">
      
      {tasks.map((task) => (
        <TaskListItem
          key={task._id}
          task={task}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteTask}
          isEditing={isTaskEditing(task._id)}
          editedTaskData={editedTaskData}
          onInputChange={handleInputChange}
          onSaveClick={handleSaveClick}
          onCancelClick={handleCancelClick}
          onEditTask={onEditTask}
         
          onStatusToggle={onStatusToggle}
        />
      ))}
    </div>
  );
};
TaskListItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dateStart: PropTypes.string,
    dateFinish: PropTypes.string,
  }).isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editedTaskData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dateStart: PropTypes.string,
    dateFinish: PropTypes.string,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      dateStart: PropTypes.string,
      dateFinish: PropTypes.string,
    })
  ).isRequired,
  onEditTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};
export default TaskList;
