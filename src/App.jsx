import { useState, useContext } from 'react';
import { AuthContext } from './components/AuthContext';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import tasksData from './data/data';
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { isLoggedIn, user, handleLogin, handleLogout, setIsLoggedIn, setUser } = useContext(AuthContext);
  const [projects, setProjects] = useState([
    { id: 1, name: 'Universidad' },
    { id: 2, name: 'Trabajo' }
  ]);
  const [newProjectName, setNewProjectName] = useState('');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [tasks, setTasks] = useState(tasksData);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleCreateTask = (taskData) => {
    setTasks([...tasks, { ...taskData, project: selectedProject.name }]);
  };

  const handleEditTask = (taskId, updatedTaskData) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          ...updatedTaskData
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleAddProjectClick = () => {
    setShowProjectForm(true);
  };

  const handleProjectNameChange = (e) => {
    setNewProjectName(e.target.value);
  };

  const handleSaveProject = () => {
    if (newProjectName) {
      const newProject = { id: projects.length + 1, name: newProjectName };
      setProjects([...projects, newProject]);
      setNewProjectName('');
      setShowProjectForm(false);
    }
  };

  const handleCancelProject = () => {
    setNewProjectName('');
    setShowProjectForm(false);
  };

  // Función para manejar el registro
  const handleRegister = (userData) => {
    // Aquí puedes realizar la lógica para registrar al nuevo usuario en el servidor y guardar la información en una base de datos
    // Por simplicidad, asumiremos que el registro es exitoso y almacenaremos los datos del usuario en el estado
    setIsLoggedIn(true);
    setUser(userData);
  };

  return (
    <div>
       <div>
       {isLoggedIn && user ? (
          <>
            <h2 className="text-black p-4 text-2xl font-bold text-center">Bienvenido a NamiTask, {user.nickName}!</h2>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <h2 className="bg-gray-800 text-white p-4 text-2xl font-bold text-center ba">Nami Task</h2>
            <h2 className="text-black p-4 text-2xl font-bold text-center">Iniciar sesión</h2>
            <LoginForm onLogin={handleLogin} />
            <h2 className="text-black p-4 text-2xl font-bold text-center">Registrarse</h2>
            <RegistrationForm onRegister={handleRegister} />
          </>
        )}
    </div>
    {isLoggedIn &&(
      <>
     <Navbar></Navbar>
      <div className="flex">
        <div className="w-1/4 bg-gray-200 p-4">
          <h2 className="text-xl font-bold mb-4">Proyectos</h2>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`cursor-pointer mb-2 ${
                selectedProject === project ? 'text-blue-500 font-bold' : 'text-gray-700'
              }`}
              onClick={() => handleProjectSelect(project)}
            >
              {project.name}
            </div>
          ))}
          {!showProjectForm && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
              onClick={handleAddProjectClick}
            >
              Añadir 
            </button>
          )}
          {showProjectForm && (
            <div className="mt-4">
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Nombre del proyecto"
                value={newProjectName}
                onChange={handleProjectNameChange}
              />
              <div className="flex justify-end mt-4">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                  onClick={handleSaveProject}
                >
                  Guardar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleCancelProject}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="w-3/4 p-4">
          {selectedProject && (
            <>
              <h2 className="text-xl font-bold mb-4">Tareas - {selectedProject.name}</h2>
              <TaskList
                tasks={tasks.filter((task) => task.project === selectedProject.name)}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
              <TaskForm
                project={selectedProject.name}
                onCreateTask={handleCreateTask}
              />
            </>
          )}
          
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default App;