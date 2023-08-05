import { useState } from 'react';

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
    
  const [editingTaskId, setEditingTaskId] = useState(null);
  
  const [editedTaskData, setEditedTaskData] = useState({
    project: '',
    taskType: '',
    taskName: '',
    taskDescription: '',
    dueDate: '',
    taskCode: ''
  });

  const handleEditClick = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
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
      project: '',
      taskType: '',
      taskName: '',
      taskDescription: '',
      dueDate: '',
      taskCode: ''
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
        <div key={task.id} className="bg-gray-100 rounded-lg p-4 mb-4">
          {isTaskEditing(task.id) ? (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="project">
                  Proyecto:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="project"
                  name="project"
                  type="text"
                  value={editedTaskData.project}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="taskType">
                  Tipo de Tarea:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="taskType"
                  name="taskType"
                  type="text"
                  value={editedTaskData.taskType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="taskName">
                  Nombre de Tarea:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="taskName"
                  name="taskName"
                  type="text"
                  value={editedTaskData.taskName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="taskDescription">
                  Descripción de Tarea:
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="taskDescription"
                  name="taskDescription"
                  value={editedTaskData.taskDescription}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="dueDate">
                  Fecha de Entrega:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  value={editedTaskData.dueDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="taskCode">
                  Código de Tarea:
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="taskCode"
                  name="taskCode"
                  type="text"
                  value={editedTaskData.taskCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={handleSaveClick}
                >
                  Guardar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleCancelClick}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold mb-2">{task.taskName}</h3>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Proyecto:</span> {task.project}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Tipo de Tarea:</span> {task.taskType}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Descripción de Tarea:</span> {task.taskDescription}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Fecha de Entrega:</span> {task.dueDate}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Código de Tarea:</span> {task.taskCode}
              </p>
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleEditClick(task.id)}
                >
                  Editar
                </button>
                <button
  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  onClick={() => handleDeleteTask(task.id)}
>
  Eliminar
</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;