import { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthContext";
import ProjectContext from "./ProjectContext";
import axios from "axios";

const ProjectManager = () => {
  const { user } = useContext(AuthContext);

  const [showJoinForm, setShowJoinForm] = useState(false);
  const [invitationCode, setInvitationCode] = useState("");
  const [projects, setProjects] = useState([]);

  const { setSelectedProject, handleUpdateTasks } = useContext(ProjectContext);

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    handleUpdateTasks(project.tasks);
  };

  useEffect(() => {
    const userId = user.id;
    axios
      .get(`http://localhost:8083/api/v2/proyects/${userId}`)
      .then((response) => {
        const data = response.data;
        const projects = data.map(projectData => ({
          id: projectData._id,
          name: projectData.name,
          idOwner: projectData.idOwner,
          authorization: projectData.authorization,
          dateStart: projectData.dateStart,
          dateFinish: projectData.dateFinish,
          codeInvitation: projectData.codeInvitation,
          users: projectData.users,
          tasks: projectData.tasks
        }));
        setProjects(projects);
        console.log(projects)
      });
  }, [user.id]); // Agregar user.id a la lista de dependencias

  const [newProjectName, setNewProjectName] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);

  const handleAddProjectClick = () => {
    setShowProjectForm(true);
    setShowJoinForm(false); // Asegurarse de que el formulario de unirse esté oculto
  };

  const handleProjectNameChange = (e) => {
    setNewProjectName(e.target.value);
  };

  const handleSaveProject = () => {
    if (newProjectName) {
      const newProject = {
        id: projects.length + 1,
        name: newProjectName,
        tasks: [],
      };
      setProjects([...projects, newProject]);
      setNewProjectName("");
      setShowProjectForm(false);
    }
  };

  const handleCancelProject = () => {
    setNewProjectName("");
    setShowProjectForm(false);
  };

  const handleJoinProject = () => {
    setShowProjectForm(false); // Asegurarse de que el formulario de crear proyecto esté oculto
    setShowJoinForm(true);
  };

  const handleJoinProjectSubmit = () => {
    // Aquí deberías implementar la lógica para verificar el código de invitación
    // y obtener el proyecto correspondiente desde el servidor.
    // Supongamos que recibes el proyecto al que te uniste en la respuesta del servidor.
    const joinedProject = {
      id: 3,
      name: "Proyecto unido",
      tasks: ["Tarea 5", "Tarea 6"],
    };

    // Verificar si el proyecto ya existe en la lista de proyectos compartidos
    if (!projects.find((project) => project.id === joinedProject.id)) {
      setProjects([...projects, joinedProject]);
    }

    // Opcional: Limpiar el código de invitación después de unirse
    setInvitationCode("");

    setShowJoinForm(false);
  };

  // Obtener las tareas asociadas a un proyecto
  const getTasksForProject = (projectId) => {
    const project = projects.find((project) => project.id === projectId);
    return project ? project.tasks : [];
  };

  // Filtrar los proyectos a los que te uniste
  const joinedProjects = projects.filter(
    (project) => project.id > 2 // Suponemos que los proyectos con id mayores a 2 son los que te uniste
  );

  return (
    <div className="w-1/4 bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Proyectos</h2>
      <ProjectList projects={projects} onSelect={handleSelectProject} />
      {!showProjectForm && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
          onClick={handleAddProjectClick}
        >
          Añadir
        </button>
      )}
      <h3 className="text-lg font-bold mt-6 mb-4">Proyectos Compartidos</h3>
      <ul>
        {joinedProjects.map((project) => (
          <li
            key={project.id}
            className="cursor-pointer text-blue-500 font-bold mb-2"
            onClick={() =>
              setSelectedProject({ id: project.id, name: project.name })
            }
          >
            {project.name}
          </li>
        ))}
      </ul>
      {showJoinForm ? (
        <div className="mt-4">
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Código de invitación"
            value={invitationCode}
            onChange={(e) => setInvitationCode(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
              onClick={handleJoinProjectSubmit}
            >
              Unirse
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowJoinForm(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mt-4 focus:outline-none focus:shadow-outline"
          onClick={handleJoinProject}
        >
          Unirse a proyecto
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
  );
};

export default ProjectManager;
