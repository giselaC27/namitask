import { useContext } from "react";
import { AuthContext } from "./components/AuthContext";
import TaskManager from "./modules/tasks/TaskManager";
import Navbar from "./components/Navbar";
import LoginForm from "./modules/login/LoginForm";
import RegistrationForm from "./modules/register/RegistrationForm";
import ProjectManager from "./modules/projects/ProjectManager";
import { ProjectProvider } from "./modules/projects/ProjectContext";
//se define el componente app

const App = () => {
  const {
    isLoggedIn, //estado de autenticacion 
    user,
    handleLogin,//proceso de autenticacion
    handleLogout,
  
  } = useContext(AuthContext); //accedemos a lo valores del contexto de autenticacion

 

  return (
    <div>
      <div>
          {/* Si el usuario está autenticado y hay datos de usuario */}
        {isLoggedIn && user ? (
          <>
           {/* Mostrar un mensaje de bienvenida y un botón de cierre de sesión */}
            <h2 className="text-black p-4 text-2xl font-bold text-center">
              Bienvenido a NamiTask, {user.lastName +" "+ user.nickName}! &#x1F44B;
            </h2>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline mb-4 ml-2"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <h2 className="bg-gray-800 text-white p-4 text-2xl font-bold text-center ba">
              Nami Task
            </h2>
            <h2 className="text-black p-4 text-2xl font-bold text-center">
              Iniciar sesión
            </h2>
            <LoginForm onLogin={handleLogin} />
            <h2 className="text-black p-4 text-2xl font-bold text-center">
              Registrarse
            </h2>
            <RegistrationForm  />
          </>
        )}
      </div>
      {/* Si el usuario está autenticado */}
      {isLoggedIn && (
        <>
        {/* Mostrar la barra de navegación y los componentes de administración */}
          <Navbar></Navbar>
          <div className="flex">
            <ProjectProvider>
              <ProjectManager />
              <div className="w-3/4 p-4">
                <TaskManager />
              </div>
            </ProjectProvider>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
