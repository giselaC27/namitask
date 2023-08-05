import  { useState, useEffect } from "react";

// Subcomponente TaskFormToggle
const TaskFormToggle = ({ onToggleForm }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={onToggleForm}
    >
      Crear Tarea
    </button>
  );
};

// Subcomponente TaskFormFields
const TaskFormFields = ({ taskData, onInputChange, onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit} className="mt-4">
      
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="taskType"
        >
          Tipo de Tarea:
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="taskType"
          name="taskType"
          type="text"
          placeholder="Examen, Tarea, etc."
          value={taskData.taskType}
          onChange={onInputChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="taskName"
        >
          Nombre de Tarea:
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="taskName"
          name="taskName"
          type="text"
          placeholder="Nombre de la tarea"
          value={taskData.taskName}
          onChange={onInputChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="taskDescription"
        >
          Descripción de Tarea:
        </label>
        <textarea
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="taskDescription"
          name="taskDescription"
          placeholder="Descripción de la tarea"
          value={taskData.taskDescription}
          onChange={onInputChange}
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
          value={taskData.dueDate}
          onChange={onInputChange}
        />
      </div>
     
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crear Tarea
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

// Subcomponente TaskFormModal
const TaskFormModal = ({ taskData, onEditTask, onSaveTask, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-xl font-bold mb-4">Tarea Creada</h2>
        <p>
          <span className="font-bold">Proyecto:</span> {taskData.project}
        </p>
        <p>
          <span className="font-bold">Tipo de Tarea:</span> {taskData.taskType}
        </p>
        <p>
          <span className="font-bold">Nombre de Tarea:</span>{" "}
          {taskData.taskName}
        </p>
        <p>
          <span className="font-bold">Descripción de Tarea:</span>{" "}
          {taskData.taskDescription}
        </p>
        <p>
          <span className="font-bold">Fecha de Entrega:</span>{" "}
          {taskData.dueDate}
        </p>
      
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            onClick={onEditTask}
          >
            Editar
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onSaveTask}
          >
            Guardar
          </button>
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

const TaskForm = ({ project, onCreateTask }) => {
  const [taskData, setTaskData] = useState({
    project: project,
    taskType: "",
    taskName: "",
    taskDescription: "",
    dueDate: "",
  
  });
  useEffect(() => {
    setTaskData((prevTaskData) => ({ ...prevTaskData, project: project }));
  }, [project]);

  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleEditTask = () => {
    setShowModal(false);
  };

  const handleSaveTask = () => {
    onCreateTask(taskData);
    setShowModal(false);
    setTaskData({
      project: "",
      taskType: "",
      taskName: "",
      taskDescription: "",
      dueDate: "",
      
    });
  };
  const handleCancel = () => {
    setShowForm(false);
    setShowModal(false);
    setTaskData({
      project: project,
      taskType: "",
      taskName: "",
      taskDescription: "",
      dueDate: "",
     
    });
  };

  return (
    <>
      <TaskFormToggle onToggleForm={handleToggleForm} />
      {showForm && (
        <TaskFormFields
          taskData={taskData}
          onInputChange={onInputChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
      {showModal && (
        <TaskFormModal
          taskData={taskData}
          onEditTask={handleEditTask}
          onSaveTask={handleSaveTask}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default TaskForm;
